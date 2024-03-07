import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react';
import { message, Form, Input, Button, Modal } from 'antd'
import axios from 'axios'
import { addCampaign } from '../../slices/campaignSlice';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [isAdmin, setIsAdmin] = useState(false)
    const formRef = useRef(null)

    const user = JSON.parse(localStorage.getItem('user'));
    // console.log("Admin", isAdmin);
    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/admins?email=${user.email}`)
                setIsAdmin(!!response.data.length)
            } catch (error) {
                console.log("Error Fetching Admins", error);
            }
        }

        if (user) {
            fetchAdmins()
        } else {
            navigate('/login/admin');
            message.info("Please Login First As Admin")
        }
    }, [user, navigate]);


    const onFinish = (values) => {
        // const randomNumber = Math.floor(Math.random() * 10000 + 1)
        // console.log("randomNumber",randomNumber);
        const { name, description, image, /* candidateName, candidateSymbol */ } = values;
        const campaignData = {
            name,
            description,
            // candidates: [{ id: randomNumber, candidateName, candidateSymbol, votes: 0 }],
            image,
        };
        console.log('Success:', campaignData);
        // dispatch(addCampaign(campaignData))
        dispatch(addCampaign(values))
        formRef.current.resetFields()
        message.success('Campagin Added Successfully')
        setIsModalOpen(false);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);


    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };





    return (
        <>
            {isAdmin && (
                <div>
                    <div className="mt-20 font-bold text-2xl text-[#F09A3E]">
                        <h2>Admin Dashboard</h2>
                    </div>
                    <div className='min-h-screen'>
                        <div className='flex justify-start space-x-3'>
                            <Button type="primary" onClick={showModal} className='bg-[#F09A3E]'  >
                                Add Campaign
                            </Button>
                            <Button type="primary" onClick={() => navigate('/campaignspage')} className='bg-[#F09A3E]'  >
                                Manage Campaigns
                            </Button>
                        </div>
                    </div>
                    {/* Add Campagin Modal */}
                    <Modal title="Add Campaign" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} >
                        <Form
                            ref={formRef}
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            className=' '
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your campaign name!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input campaign description!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Image Link"
                                name="image"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Image link!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            {/* <Form.Item
                                label="1st Canididate Name"
                                name="candidateName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Candidate/Product!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="1st's Symbol Link"
                                name="candidateSymbol"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Symbol link of 1st Canididate!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item> */}

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit" className='bg-slate-600 w-full ' >
                                    Add Campaign
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            )}
        </>
    );
};

export default AdminDashboard;

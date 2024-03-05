import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react';
import { message, Form, Input, Button, Modal, Select } from 'antd'
import axios from 'axios'
import { addCampaign } from '../../slices/campaignSlice';
import { addCandidate } from '../../slices/canidateSlice/canidateSlice';

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
        const { name, description, image, firstCandidate, firstSymbol, secondCandidate, secondSymbol, } = values;
        const campaignData = {
            name,
            description,
            candidates: [{ firstCandidate, firstSymbol }, { secondCandidate, secondSymbol }],
            image
        };
        console.log('Success:', campaignData);
        dispatch(addCampaign(campaignData))
        formRef.current.resetFields()
        message.success('Campagin Added Successfully')
        setIsModalOpen(false);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [canModalOpen, setCanModalOpen] = useState(false);
    

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const canModalCan = () => {
        setCanModalOpen(true)
    };
    const handleOkCan = () => {
        setCanModalOpen(false)
    };
    const handleCancelCan = () => {
        setCanModalOpen(false)
    };

    // candidate modal    
    const campaigns = useSelector((state) => state.campaign.campaigns);
    // console.log("Campaigns", campaigns);
    const [selectedCampaign, setSelectedCampaign] = useState('');
    const [candidateName, setCandidateName] = useState('');
    const handleSubmit = () => {
        dispatch(addCandidate({ name: candidateName, campaignId: selectedCampaign }));
        message.success('Candidate added successfully');
        setCandidateName('');
        setSelectedCampaign('');
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
                            <Button type="primary" onClick={canModalCan} className='bg-[#F09A3E]'  >
                                Add Candidate
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

                            <Form.Item
                                label="1st Canididate Name"
                                name="firstCandidate"
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
                                name="firstSymbol"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Symbol link of 1st Canididate!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="2nd Canididate Name"
                                name="secondCandidate"
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
                                label="2nd's Symbol Link"
                                name="secondSymbol"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Symbol link of 2nd Canididate!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
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
                    {/* Add candidate Modal */}
                    <Modal title="Add Candidate" open={canModalOpen} onOk={handleOkCan} onCancel={handleCancelCan}  >
                        <Form >
                            <Form.Item label="Candidate Name">
                                <Input value={candidateName} onChange={(e) => setCandidateName(e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Campaign">
                                <Select value={selectedCampaign} onChange={(value) => setSelectedCampaign(value)}>
                                    {campaigns.map((campaign) => (
                                        <Select.Option key={campaign.id} value={campaign.id}>
                                            {campaign.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <div className='flex justify-end '>
                                <Form.Item>
                                    <Button type="primary" className='bg-gray-600 w-full mt-4' onClick={handleSubmit}>Add Candidate</Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </Modal>
                </div>
            )}
        </>
    );
};

export default AdminDashboard;

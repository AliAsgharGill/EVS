import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react';
import { message, Form, Input, Button, Modal, DatePicker } from 'antd'
import axios from 'axios'
import { addCampaign, fetchCampaigns } from '../../slices/campaignSlice';
import { fetchDynamicCandidates } from '../../slices/dyanmicCandidateSlice/dyanmicCandidateSlice';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { allowUserActions } from '../../slices/allowedUser/allowedUser';

// import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);





const AdminDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [isAdmin, setIsAdmin] = useState(false)
    const formRef = useRef(null)

    const user = JSON.parse(localStorage.getItem('user'));


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

    const [form] = Form.useForm();
    const [campaignDuration, setCampaignDuration] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    const onFinish = (values) => {
        const { name, description, image } = values;
        const campaignData = {
            name,
            description,
            image,
        };
        console.log('Success:', campaignData);
        dispatch(addCampaign(values))
        formRef.current.resetFields()
        message.success('Campagin Added Successfully')
        setIsModalOpen(false);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinishAddUser = (values) => {
        dispatch(allowUserActions.addAllowedUser(values))
        formRef.current.resetFields()
        setIsOpen(false)
        message.success('Email Added Successfully')
    }



    const showModal = () => {
        setIsModalOpen(true);
        setIsOpen(true)
    };
    const handleOk = () => {
        setIsModalOpen(false);
        setIsOpen(false)
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsOpen(false)
    };


    const clearLocalStorage = () => {
        localStorage.clear();
        navigate('login/user')
        message.success("Clear Successfully")
    }

    const candidates = useSelector(state => state.dynamicCandidates.candidates)
    // console.log(' Campaigns', campaigns);
    // console.log(' Candidates', candidates);

    useEffect(() => {
        dispatch(fetchCampaigns())
        dispatch(fetchDynamicCandidates())
    }, [dispatch])


    // graph start

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Running Campaigns',
            },
        },
    };


    const data = {
        // labels: users.map(user => user.name),
        labels: candidates.map(candidate => candidate.candidateName),

        datasets: [
            {
                label: 'Votes',
                data: candidates.map(candidate => candidate.votes),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],

    };

    // graph end

    const addEmail = () => {
        setIsOpen(true)
    }


    return (
        <>
            {isAdmin && (
                <div>
                    <div className="mt-5 font-bold text-3xl text-[#F09A3E]">
                        <h2>Admin Dashboard</h2>
                    </div>
                    <div className='min-h-screen'>
                        {/* <div className='flex justify-start space-x-3'> */}
                        <div className='grid sm:grid-cols-2 md:grid-cols-3 place-items-center gap-4 my-16'>
                            <Button type="primary" onClick={showModal} className="inline-flex items-center justify-center h-12 px-6 font-bold p-10 tracking-wide text-white bg-gray-500 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none text-lg md:text-2xl">
                                Add Campaign
                            </Button>
                            <Button type="primary" onClick={() => navigate('/campaignspage')} className="inline-flex items-center justify-center h-12 px-6 font-bold p-10 tracking-wide text-white bg-gray-500 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none text-2xl"   >
                                Manage Campaigns
                            </Button>
                            <Button type="primary" onClick={() => clearLocalStorage()} className="inline-flex items-center justify-center h-12 px-6 font-bold p-10 tracking-wide text-white bg-gray-500 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none text-2xl"   >
                                Clear Local Storage
                            </Button>
                            <Button type="primary" onClick={() => addEmail()} className="inline-flex items-center justify-center h-12 px-6 font-bold p-10 tracking-wide text-white bg-gray-500 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none text-2xl"   >
                                Add User Email
                            </Button>
                        </div>
                        <div className='md:w-1/2  space-y-10  flex flex-col md:flex-row items-center  '>
                            <Bar className=' hidden md:block' options={options} data={data} />
                            <Doughnut data={data} />
                        </div>
                    </div>
                    {/* Add Campagin Modal */}
                    <Modal title="Add Campaign" form={form} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} >
                        <Form
                            ref={formRef}
                            name="basic"
                            labelCol={{
                                span: 10,
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

                            <Form.Item label="Campaign Start Date & Time" name="startDate">
                                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" onChange={(date, dateString) => setCampaignDuration([dateString, ...campaignDuration[1]])} />
                            </Form.Item>
                            <Form.Item label="Campaign End Date & Time" name="endDate">
                                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" onChange={(date, dateString) => setCampaignDuration([...campaignDuration[0], dateString])} />
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
                    {/* Add Allowed Users for registeration */}
                    <Modal title="Add Allowed User" form={form} open={isOpen} onOk={handleOk} onCancel={handleCancel} footer={null} >
                        <Form
                            ref={formRef}
                            name="basic"
                            labelCol={{
                                span: 10,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            className=' '
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinishAddUser}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input user email!',
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
                                    Allow User
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            )
            }
        </>
    );
};

export default AdminDashboard;

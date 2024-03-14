import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react';
import { message, Form, Input, Button, Modal, DatePicker, Tooltip } from 'antd'
import axios from 'axios'
import { addCampaign, fetchCampaigns } from '../../slices/campaignSlice';
import { fetchDynamicCandidates } from '../../slices/dyanmicCandidateSlice/dyanmicCandidateSlice';
import { Bar, Doughnut } from 'react-chartjs-2';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    // Tooltip,
    Legend,
} from 'chart.js';
import { allowUserActions } from '../../slices/allowedUser/allowedUser';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { MdCopyAll } from 'react-icons/md';
import { deleteAllTokens } from '../../slices/clearArray/clearArray';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    // Tooltip,
    Legend
);

const AdminDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [isAdmin, setIsAdmin] = useState(false)
    const formRef = useRef(null)

    const user = JSON.parse(localStorage.getItem('user'));
    // console.log("User On Dashboard:", user);


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





    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOkUser = () => {
        setIsOpen(false)
    };
    const handleCancelUser = () => {
        setIsOpen(false)
    };
    const onFinishAddUser = (values) => {
        dispatch(allowUserActions.addAllowedUser(values))
        formRef.current.resetFields()
        setIsOpen(false)
        message.success('Email Added Successfully')
    }

    const clearLocalStorage = () => {
        Modal.confirm({
            title: 'Confirm Clear',
            content: 'You Will Logout!',
            okButtonProps: { style: { backgroundColor: "#F09A60" } },
            onOk() {
                localStorage.clear();
                navigate('/login/user')
                message.success("Clear Successfully")
            },
            onCancel() { },
        });
    }
    const [token, setToken] = useState(null);
    const [expiresAt, setExpiresAt] = useState(null);

    const generateToken = async () => {
        setView('block')
        const newToken = uuidv4();
        console.log("New Token", newToken);
        const expirationTime = moment().add(1, 'hour').toLocaleString();

        setToken(newToken);
        setExpiresAt(expirationTime);

        await axios.post('http://localhost:3000/tokens', { newToken, expirationTime });

        // localStorage.setItem('token', newToken);
        // localStorage.setItem('expiresAt', expirationTime);
    };

    const { loading, cleared, error } = useSelector((state) => state.tokens)

    // console.log("Loading", loading);
    // console.log("Cleared", cleared);
    // console.log("Error", error);

    const clearTokens = async () => {
        try {
            dispatch(deleteAllTokens())
            message.info("All Links Deleted");
        } catch (error) {
            console.error('Error clearing Links:', error);
            message.error("Failed to clear Links");
        }
    }

    const candidates = useSelector(state => state.dynamicCandidates.candidates)

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
    // copy text to clipboard
    const [view, setView] = useState('hidden')
    const handleCopy = () => {
        message.success('Copied!');
        setView('hidden')
    };

    return (
        <>
            {isAdmin && (
                <div>
                    <div className="mt-5 font-bold text-3xl text-[#F09A3E]">
                        <h2>Admin Dashboard</h2>
                    </div>
                    <div className='min-h-screen'>
                        {/* <div className='flex justify-start space-x-3'> */}
                        <div className='grid sm:grid-cols-2 md:grid-cols-3 place-items-center gap-5 my-16'>
                            <Button type="" onClick={showModal} className=" hover-button inline-flex w-64 items-center justify-center h-12 px-6 font-bold p-10 tracking-wide text-white bg-gray-500 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none text-lg md:text-2xl">
                                Add Campaign
                            </Button>
                            <Button type="" onClick={() => navigate('/campaignspage')} className=" hover-button w-64 inline-flex items-center justify-center h-12 px-6 font-bold p-10 tracking-wide text-white bg-gray-500 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none text-2xl"   >
                                Manage Campaigns
                            </Button>
                            <Button type="" onClick={() => addEmail()} className=" hover-button inline-flex w-64 items-center justify-center h-12 px-6 font-bold p-10 tracking-wide text-white bg-gray-500 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none text-2xl"   >
                                Add User Email
                            </Button>
                            <Button type="" onClick={() => clearLocalStorage()} className=" hover-button inline-flex w-64 items-center justify-center h-12 px-6 font-bold p-10 tracking-wide text-white bg-gray-500 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none text-2xl"   >
                                Clear Local Storage
                            </Button>
                            <Button type="" onClick={generateToken} className=" hover-button inline-flex w-64 items-center justify-center h-12 px-6 font-bold p-10 tracking-wide text-white bg-gray-500 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none text-2xl"   >
                                Generate Link
                            </Button>
                            <Button type="" onClick={clearTokens} className=" hover-button inline-flex w-64 items-center justify-center h-12 px-6 font-bold p-10 tracking-wide text-white bg-gray-500 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none text-2xl"   >
                                Delete All Links
                            </Button>
                        </div>
                        {token && (
                            <div className={`flex ${view} justify-center sm:justify-start space-x-5`}>
                                <CopyToClipboard text={`http://localhost:5173/signup/user?token=${token}`}>
                                    <Tooltip title="Link For Signup, Click To Copy!" className='cursor-pointer custom-tooltip' color='#F09A3E' onClick={handleCopy}>
                                        <Input suffix={<MdCopyAll style={{ cursor: 'pointer' }} onClick={handleCopy} />} className='w-1/2 p-3 hover:border-[#F09A3E] mx-auto cursor-pointer' value={`http://localhost:5173/signup/user?token=${token}`} readOnly />
                                    </Tooltip>
                                </CopyToClipboard>
                            </div>
                        )}
                        <div className='md:w-1/2  space-y-10  flex flex-col md:flex-row  items-center space-x-10  p-10 '>
                            <Bar className=' hidden md:block' options={options} data={data} />
                            <Doughnut data={data} />
                        </div>
                    </div>
                    {/* Add Campagin Modal */}
                    <Modal title="Add Campaign" form={form} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} >
                        <Form
                            ref={formRef}
                            name="add campaign"
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
                                <Button type="primary" htmlType="submit" className='bg-slate-600 w-full hover-button ' >
                                    Add Campaign
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                    {/* Add Allowed Users for registeration */}
                    <Modal title="Add Allowed User" form={form} open={isOpen} onOk={handleOkUser} onCancel={handleCancelUser} footer={null} >
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
                                <Button type="primary" htmlType="submit" className='bg-slate-600 w-full hover-button' >
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

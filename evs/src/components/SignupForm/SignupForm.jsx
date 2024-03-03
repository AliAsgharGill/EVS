import { Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux'
import { signUpUser } from '../../slices/authSlice/authSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { RiLockPasswordFill, RiUserFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
// import { useHistory } from 'react-router-dom'
import { setUser } from '../../slices/userSlice/userSlice';
import { setAdmin } from '../../slices/adminSlice/adminSlice';
// import { useState } from 'react';
import axios from 'axios'
import { useState } from 'react';

const SignupForm = ({ prop, type, path }) => {
    const dispatch = useDispatch()
    // const navigate = useNavigate()

    // const history = useHistory()

    // const [isView, setIsView] = useState(false)

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const onFinish = async (values) => {
        setLoading(true)
        try {


            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(values.email)) {
                message.error('Invalid email format. Please enter a valid email.');
                setLoading(false);
                return;
            }

            if (values.password.length < 6) {
                message.error('Password must be at least 6 characters long.');
                setLoading(false);
                return;
            }


            const response = await axios.get(`http://localhost:3000/${type}s?email=${values.email}`)

            if (response.data.length > 0) {
                message.warning(`Email ${values.email} Already Exist Please Login Instead`)
                return;
            }

            await axios.post(`http://localhost:3000/${type}s`, values)
            message.success("Welcome Registerd successfully. Please login.")

            console.log('Signup Received values:', values);

            if (type === 'user') {
                dispatch(setUser(response.data))
                navigate('/login/user')

            } else if (type === 'admin') {
                dispatch(setAdmin(response.data))
                navigate('/login/admin')
            }

        } catch (error) {
            message.error('Error Singup:', error)
            setLoading(false)
        }
        setLoading(false)
        // history.push('/login')
        // dispatch(signUpUser(values))
    };
    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };

    return (
        <>
            <div className='min-h-screen flex justify-center items-center'>
                <Form
                    className={`bg-gray-300 p-10 rounded ${prop}`}
                    name="signup-form"
                    onFinish={onFinish}
                    layout="vertical"
                >

                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter your name!' }]}
                    >
                        <Input placeholder='Name' prefix={<RiUserFill />} />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please enter your email!' }]}
                    >
                        <Input placeholder='Email' prefix={<MdEmail />} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password!' }]}
                    >
                        <Input.Password placeholder='Password' prefix={<RiLockPasswordFill />} />
                    </Form.Item>
                    {/* <Button onClick={() => setIsView(true)} >Choose Symbol</Button>
            <Modal open={isView} onCancel={() => setIsView(false)} onOk={() => setIsView(false)} onFinish={() => onFinish} onFinishFailed={() => onFinishFailed} >
                <Form.Item
                    label="Choose Symbol"
                    name="emoji"
                    rules={[{ required: true, message: 'Please Choose Your Symbol!' }]}
                >
                    <EmojiPicker />
                </Form.Item>
            </Modal> */}



                    <Form.Item>
                        <Button className='bg-gray-900' type="primary" htmlType="submit">
                            Sign Up
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <p className='hover:text-black'>
                            Already have an account?
                            <Link className='text-blue-500 hover:text-[#F09A3E]' to={path} >
                                --Login Now
                            </Link>
                        </p>
                    </Form.Item>
                </Form >
            </div>
        </>
    );
};

export default SignupForm;

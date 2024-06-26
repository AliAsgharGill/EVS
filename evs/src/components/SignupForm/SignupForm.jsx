import { Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { RiLockPasswordFill, RiUserFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { setUser } from '../../slices/userSlice/userSlice';
import { setAdmin } from '../../slices/adminSlice/adminSlice';
import axios from 'axios'

const SignupForm = ({ prop, type }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    // console.log("URL Token", token);

    const checkTokenStatus = async () => {
        // const { data: tokens } = await axios.get('http://localhost:3000/tokens')

        const tokenKey = `token_${token}`;
        const tokenUsed = localStorage.getItem(tokenKey);

        if (tokenUsed) {
            message.warning("Link Expired. Redirecting to home page...");
            navigate('/')
            return;
        } else {
            localStorage.setItem(tokenKey, 'true')
        }

    }


    window.onload = checkTokenStatus;

    const onFinish = async (values) => {
        try {

            const validateToken = async (token) => {
                const { data: tokens } = await axios.get('http://localhost:3000/tokens')

                const now = Date.now()
                const findIndex = tokens.findIndex((t) => t.newToken === token && new Date(t.expirationTime) > now)
                // console.log("Token Index Data:", findIndex);

                // Checking if this link is already used then redirect user to home
                if (findIndex != -1) {
                    const tokenKey = `token_${token}`
                    // console.log("Token Key:", tokenKey);
                    const tokenUsed = localStorage.getItem(tokenKey)

                    if (tokenUsed) {
                        message.info("Link Expired");
                        navigate('/')
                        return;
                    } else {
                        message.info("Link is Valid");
                        localStorage.setItem(tokenKey, 'true')
                    }

                    
                    return true;
                }
                // message.warning('Invalide Crdentials!')
                return false

            }
            const result = await validateToken(token)
            // console.log("Result", result);

            if (result) {

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(values.email)) {
                    message.error('Invalid email format. Please enter a valid email.');
                    return;
                }

                if (values.password.length < 6) {
                    message.error('Password must be at least 6 characters long.');
                    return;
                }

                const response = await axios.get(`http://localhost:3000/${type}s?email=${values.email}`);
                if (response.data.length > 0) {
                    message.warning(`Email ${values.email} Already Exists. Please Login Instead.`);
                    return;
                }

                await axios.post(`http://localhost:3000/${type}s`, values);
                message.success("Welcome! Registered successfully. Please login.");

                if (type === 'user') {
                    dispatch(setUser(response.data));
                    navigate('/login/user');
                } else if (type === 'admin') {
                    dispatch(setAdmin(response.data));
                    navigate('/login/admin');
                }
            } else {
                // Check if user is allowed to signup
                const userAllowed = await axios.get(`http://localhost:3000/allowedUsers?email=${values.email}`);
                if (!userAllowed.data.length) {
                    message.warning("Not allowed to register");
                    return;
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(values.email)) {
                    message.error('Invalid email format. Please enter a valid email.');
                    return;
                }

                if (values.password.length < 6) {
                    message.error('Password must be at least 6 characters long.');
                    return;
                }

                const response = await axios.get(`http://localhost:3000/${type}s?email=${values.email}`);
                if (response.data.length > 0) {
                    message.warning(`Email ${values.email} Already Exists. Please Login Instead.`);
                    return;
                }

                await axios.post(`http://localhost:3000/${type}s`, values);
                message.success("Welcome! Registered successfully. Please login.");

                if (type === 'user') {
                    dispatch(setUser(response.data));
                    navigate('/login/user');
                } else if (type === 'admin') {
                    dispatch(setAdmin(response.data));
                    navigate('/login/admin');
                }
            }
        } catch (error) {
            message.error('Error Signing Up:', error);
        }
    };



    return (
        <>
            <div className='min-h-screen flex justify-center items-center'>

                <Form
                    className='bg-gray-300 p-10 rounded mt-20 sm:w-1/2 sm:mt-30 md:w-1/3  md:mt-0'
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

                    <Form.Item>
                        <Button className='bg-gray-900' type="primary" htmlType="submit">
                            Sign Up
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <p className='hover:text-black'>
                            Already have an account?
                            <Link className='text-blue-500 hover:text-[#F09A3E]' to='/login/user' >
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

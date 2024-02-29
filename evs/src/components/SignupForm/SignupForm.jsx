import { Form, Input, Button, } from 'antd';
import { useDispatch } from 'react-redux'
import { signUpUser } from '../../slices/authSlice/authSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
// import { useState } from 'react';


const SignupForm = ({ prop }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const [isView, setIsView] = useState(false)

    const onFinish = (values) => {
        console.log('Signup Received values:', values);
        dispatch(signUpUser(values))
    };
    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };

    return (
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
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please enter your email!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please enter your password!' }]}
            >
                <Input.Password />
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
                <Button onClick={()=> navigate('/')} className='bg-gray-900' type="primary" htmlType="submit">
                    Sign Up
                </Button>
            </Form.Item>
            <Form.Item>
                <p className='hover:text-black'>
                    Already have an account?
                    <Link className='text-blue-500 hover:text-[#F09A3E]' to='/login' >
                        --Login Now
                    </Link>
                </p>
            </Form.Item>
        </Form >
    );
};

export default SignupForm;

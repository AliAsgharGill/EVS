import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux'
import { signUpUser } from '../../slices/authSlice/authSlice';
import { Link } from 'react-router-dom';


const SignupForm = ({ onClose }) => {
    const dispatch = useDispatch()

    const onFinish = (values) => {
        console.log('Signup Received values:', values);
        dispatch(signUpUser(values))
    };

    return (
        <Form
            className="bg-gray-300 p-10 rounded w-1/3"
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

            <Form.Item>
                <Button style={{ backgroundColor: 'red' }} type="primary" htmlType="submit">
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
        </Form>
    );
};

export default SignupForm;
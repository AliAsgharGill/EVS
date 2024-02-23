import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux'
import { signUpUser } from '../../slices/authSlice';


const SignupForm = ({ onClose }) => {
    const dispatch = useDispatch()

    const onFinish = (values) => {
        console.log('Signup Received values:', values);
        dispatch(signUpUser(values))
    };

    return (
        <Form
            className="bg-gray-300 p-10"
            name="signup-form"
            onFinish={onFinish}
            layout="vertical"
        >

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
                <Button style={{ backgroundColor: 'red' }} onClick={onClose} htmlType="submit" >Close Modal</Button>

            </Form.Item>
        </Form>
    );
};

export default SignupForm;
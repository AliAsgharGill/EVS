import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addCandidate } from '../slices/candidateSlice';

const SignupForm = () => {
    const dispatch = useDispatch();

    const onFinish = (values) => {
        console.log('Received values:', values);
        dispatch(addCandidate(values));
    };

    return (
        <Form
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
                <Button type="primary" htmlType="submit">
                    Sign Up
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SignupForm;

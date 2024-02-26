import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux'
import { signInUser } from '../../slices/authSlice/authSlice';
import { Link } from 'react-router-dom';
const LoginForm = ({ prop }) => {

  const dispatch = useDispatch()

  const onFinish = (values) => {
    console.log('Received values:', values);
    dispatch(signInUser(values))
  };

  return (

    <Form
      name="login-form"
      onFinish={onFinish}
      layout="vertical"
      className={`bg-gray-300 p-10 rounded ${prop}`}
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
        <Button type="primary" htmlType="submit" className='bg-gray-900'>
          Log In
        </Button>
      </Form.Item>

      <Form.Item>
        <p className='hover:text-black'>
          Dont have an account
          <Link className='text-blue-500 hover:text-[#F09A3E]' to='/signup' >
            --Register Now
          </Link>
        </p>
      </Form.Item>
    </Form >
  );
};

export default LoginForm;

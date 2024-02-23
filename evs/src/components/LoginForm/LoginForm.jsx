import { Form, Input, Button } from 'antd';

const LoginForm = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <Form
      name="login-form"
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
          Log In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;

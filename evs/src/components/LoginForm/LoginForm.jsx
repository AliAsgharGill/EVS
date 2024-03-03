import { Form, Input, Button, message } from 'antd';
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch } from 'react-redux'
import { signInUser } from '../../slices/authSlice/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'

import { setUser } from '../../slices/userSlice/userSlice';
import { setAdmin } from '../../slices/adminSlice/adminSlice';
const LoginForm = ({ prop, path, type }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = async (values) => {
    try {
      const emailResponse = await axios.get(`http://localhost:3000/${type}s?email=${values.email}`)
      if (emailResponse.data.length === 0) {
        message.error('Invalid Email. Please try again.');
        return
      }

      const passwordResponse = await axios.get(`http://localhost:3000/${type}s?password=${values.password}`);
      // console.log("Response", response.data);
      if (passwordResponse.data.length === 0) {
        message.error('Invalid password. Please try again.');
      } else if (type === 'admin') {
        message.success("Welcome Back Admin")
        dispatch(setUser(passwordResponse.data[0]))
        navigate('/login/admin')
      } else if (type === 'user') {
        message.success("Welcome Back")
        dispatch(setUser(passwordResponse.data[0]))
        navigate('/login/user')
      }
    } catch (error) {
      console.error('Error logging in:', error);
      message.error('An error occurred. Please try again.');
    }
    // history('/')
    console.log('Received values:', values);
    // dispatch(signInUser(values))
  };

  return (
    <>
      <div className='min-h-screen flex justify-center items-center'>
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
            <Input placeholder='Email' prefix={<FaRegUserCircle />} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password placeholder='Password' prefix={<RiLockPasswordLine />} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className='bg-gray-900'>
              Log In
            </Button>
          </Form.Item>

          <Form.Item>
            <p className='hover:text-black'>
              Dont have an account
              <Link className='text-blue-500 hover:text-[#F09A3E]' to={path} >
                --Register Now
              </Link>
            </p>
          </Form.Item>
        </Form >
      </div>
    </>

  );
};

export default LoginForm;
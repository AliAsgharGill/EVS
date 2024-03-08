import { Form, Input, Button, message } from 'antd';
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../../slices/userSlice/userSlice';
import { setAdmin } from '../../slices/adminSlice/adminSlice';
import axios from 'axios'

const LoginForm = ({ prop, type }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const onFinish = async (values) => {

    // checking is member exist
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
        localStorage.setItem('user', JSON.stringify(passwordResponse.data[0]))
        dispatch(setAdmin(passwordResponse.data[0]))
        navigate('/dashboard')
      } else if (type === 'user') {
        message.success("Welcome Back")
        localStorage.setItem('user', JSON.stringify(passwordResponse.data[0]))
        dispatch(setUser(passwordResponse.data[0]))
        navigate('/')
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
              Dont have an account-
              <Link className='text-blue-500 hover:text-[#F09A3E]' to='/signup/user' >
                Register Now
              </Link>
            </p>

            <Link className='text-blue-500 hover:text-[#F09A3E]' to='/login/admin'>
              {type === 'user' ? (
                <>
                  <p className='text-black hover:text-black'>OR</p>
                  <p>Login as Admin</p>
                </>
              ) : ''}
            </Link>
            <Link className='text-blue-500 hover:text-[#F09A3E]' to='/login/user'>
              {type === 'admin' ? (
                <>
                  <p className='text-black hover:text-black'>OR</p>
                  <p>Login as User</p>
                </>
              ) : ''}
            </Link>


          </Form.Item>
        </Form >
      </div>
    </>

  );
};

export default LoginForm;
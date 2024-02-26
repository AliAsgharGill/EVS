import { Form, Input, Button, Upload } from "antd";

import { useDispatch } from "react-redux";
import { addNewCandidate } from "../../slices/authSlice/authSlice";
import { Link } from "react-router-dom";

const AddNewCandidateForm = () => {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log("New Candidate Received values:", values);
    dispatch(addNewCandidate(values));
  };



  return (
    <div className="flex justify-center   ">
      <Form

        className="bg-gray-300 p-10 rounded "
        name="signup-form"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Na Number"
          name="na"
          rules={[{ required: true, message: "Please enter your NA Number!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password />
        </Form.Item>


        <Form.Item
          label="Symbol Image"
          name="image"
          rules={[{ required: true, message: "Please enter your Symbol Image!" }]}
        >
          <Upload action={'http://localhost:3000/candidates'}>
            <Button>Upload</Button>
          </Upload>
        </Form.Item>


        <Form.Item>
          <Button className="bg-gray-900" type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
        <Form.Item>
          <p className="hover:text-black">
            Already have an account?
            <Link className="text-blue-500 hover:text-[#F09A3E]" to="/login">
              --Login Now
            </Link>
          </p>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddNewCandidateForm;

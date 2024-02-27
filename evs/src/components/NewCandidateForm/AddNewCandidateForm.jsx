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
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: "Please enter your phone number!" }]}
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
            Add CandidateS
          </Button>
        </Form.Item>

      </Form>
    </div>
  );
};

export default AddNewCandidateForm;

import { Form, Input, Button, Upload } from "antd";
import { useDispatch } from "react-redux";
import { addNewCanidate } from "../../slices/canidateSlice/canidateSlice";
import { useRef } from "react";
// import { Link } from "react-router-dom";

const AddNewCandidateForm = ({ onCloseModal }) => {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log("New Candidate Received values:", values);
    dispatch(addNewCanidate(values));
    formRef.current.restFields();
    onCloseModal();
  };

  const formRef = useRef(null)

  return (
    <div className="flex justify-center   ">
      <Form
        ref={formRef}
        className="bg-gray-300 p-10 rounded w-full "
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
          rules={[{ required: true, message: "Please Enter Link of Symbol" }]}
        >
          <Input />
        </Form.Item>


        <Form.Item>
          <Button className="bg-gray-900 w-full" type="primary" htmlType="submit">
            Add Candidate
          </Button>
        </Form.Item>

      </Form>
    </div>
  );
};

export default AddNewCandidateForm;

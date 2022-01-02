import React from "react";
import { Row, Form, Input, Button, Divider, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { admin } from "./adminAuth";
export const Admin = () => {
  const [token, setToken] = useState(null);
  console.log(token);

  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onSubmit = (values) => {
    setToken(values);
    admin.map((item) => {
      if (
        item.username === values.username &&
        item.password === values.password
      ) {
        alert("successfully Loggedin");
        navigate("/employee");
      } else {
        alert("invalid credential");
      }
    });

    form.resetFields();
  };

  return (
    <div>
      <Divider orientation="center">Admin System</Divider>
      <Row justify="center" style={{ padding: "5%" }}>
        <Form autoComplete="off" onFinish={onSubmit} form={form}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true },
              {
                min: 4,
              },
              {
                max: 5,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              { min: 3 },
              { max: 4 },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 11,
              span: 25,
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
          <Link to="/login">Employee Login</Link>
        </Form>
      </Row>
    </div>
  );
};

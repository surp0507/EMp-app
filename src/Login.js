import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Row, Form, Input, Button, Divider } from "antd";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [errorpass, setErrorPass] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [form] = Form.useForm();

  const rquestData = async () => {
    const response = await axios.get(`http://localhost:3004/data`);
    setData(response.data);
  };
  const onSubmit = async (values) => {
    const newData = data.filter((item) => {
      const pass = JSON.parse(values.password);
      if (item.id === pass) {
        return item;
      }
    });

    newData.map((item) => {
      if (values.username === item.employee_name) {
        navigate(`/emp/${item.id}`);
      } else {
        alert("incorrect username or password");
      }
    });
  };

  useEffect(() => {
    rquestData();
  }, []);
  return (
    <div>
      <Divider orientation="center">Employee System</Divider>
      <Row justify="center" style={{ padding: "5%" }}>
        <Form form={form} autoComplete="off" onFinish={onSubmit}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true },

              {
                max: 20,
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
              { min: 4 },
              { max: 8 },
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
          <Link to="/admin">Admin Login</Link>
        </Form>
      </Row>
    </div>
  );
};

import axios from "axios";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { city } from "./City";
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Layout, Menu, Breadcrumb } from 'antd';
import { Table, Button, Modal, Input,Row,Col } from "antd";

export const Employee = () => {
  const [show, setShow] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [employee_name, setName] = useState("");
  const [employee_age, setAge] = useState("");
  const [employee_salary, setSalary] = useState("");
  const [employee_email, setEmployeeEmail] = useState("");
  const [employee_phone, setEmployeePhone] = useState("");
  const [employee_type, setEmployeeType] = useState("");
  const [employee_city, setEmployeeCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal1Visible, setModal1Visible] = useState(false);
  console.log(modal1Visible);
  const { Header, Content, Footer } = Layout;
  const columns = [
    {
      title: "emp_name",
      dataIndex: "employee_name",
    },
    {
      title: "emp_age",
      dataIndex: "employee_age",
    },
    {
      title: "emp_salary",
      dataIndex: "employee_salary",
    },
    {
      title: "emp_email",
      dataIndex: "employee_email",
    },
    {
      title: "emp_phone",
      dataIndex: "employee_phone",
    },
    {
      title: "city",
      dataIndex: "employee_city",
    },
    {
      title: "Action",
      render: (record) => {
        return (
          <>
            <Link to={`/emp/${record.id}`}>
              <EditOutlined />
            </Link>
            <DeleteOutlined
              onClick={() => deleteEmp(record.id)}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    watch,
  } = useForm();

  const handleClose = () => setModal1Visible(false);
  const handleShow = () => setShow(true);

  const requestEmp = async () => {
    setLoading(true);
    const response = await axios.get(`http://localhost:3004/data`);
    setTimeout(() => {
      setDataSource(response.data);
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    requestEmp();
  }, []);

  const onSubmit = async () => {
    alert("employee added successfully");

    const data = {
      employee_name,
      employee_age,
      employee_salary,
      employee_email,
      employee_phone,
      employee_type,
      employee_city,
    };
    const response = await axios.post(`http://localhost:3004/data`, {
      ...data,
    });
    requestEmp();
    handleClose();
    setLoading(true)
    reset();
  };

  const deleteEmp = async (id) => {
    let userconfirmation = window.confirm(
      "Are you sure you want to delete this"
    );
    if (userconfirmation == true) {
      alert("deleted successfully");
      const response = await axios.delete(`http://localhost:3004/data/${id}`);
      console.log(response.data);
      requestEmp();
      return true;
    } else {
      return false;
    }
  };
  const handleChange = (e) => {
    setEmployeeCity(e.target.value);
  };

  if (!dataSource) return "Loading...";
  return (
    <div>
      <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item>Employee App</Menu.Item>
        <Menu.Item><Link style={{textDecoration:"none"}}  to="/">Home</Link> </Menu.Item>
        <Menu.Item> <Link style={{textDecoration:"none"}} to="/login">Login </Link></Menu.Item>
        <Menu.Item><Link style={{textDecoration:"none"}}  to="/admin">Admin </Link></Menu.Item>

      </Menu>
    </Header>
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
      <span>
        {" "}
        Total_Emp:-
        <span className="text-danger">{dataSource.length}</span>
      </span>
      <div className="btn">
        <Button
          className="mx-5"
          variant="primary"
          onClick={() => setModal1Visible(true)}
        >
          Add Employee
        </Button>
      </div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
      ></Table>
      <Modal
        footer={null}
        title="Employee Details"
        style={{ top: 20 }}
        visible={modal1Visible}
        onOk={() => setModal1Visible(false)}
        onCancel={() => setModal1Visible(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="form-group" onChange={(e) => setName(e.target.value)}>
            <input
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "minimum allowed length is 3 ",
                },
                maxLength: {
                  value: 20,
                  message: "Maximum allowed length is 20 ",
                },
              })}
              onKeyUp={() => {
                trigger("name");
              }}
              type="text"
              className={` form-control ${
                errors.name && "invalid"
              } text-center`}
              placeholder="Enter name"
            />
            {errors.name && (
              <small className="text-danger">{errors.name.message}</small>
            )}
          </div>
          <div className="form-group" onChange={(e) => setAge(e.target.value)}>
            <input
              {...register("age", {
                required: "Age is required",
                min: {
                  value: 18,
                  message: "minimum age is 18",
                },
                max: {
                  value: 70,
                  message: "maximum allowed age is 70",
                },
                pattern: {
                  value: /^[0-9]*$/,
                  message: "only number are allowed",
                },
              })}
              onKeyUp={() => {
                trigger("age");
              }}
              type="text"
              className={` form-control ${
                errors.age && "invalid"
              } my-2 text-center`}
              placeholder="Enter age"
            />
            {errors.age && (
              <small className="text-danger">{errors.age.message}</small>
            )}
          </div>
          <div
            className="form-group"
            onChange={(e) => setSalary(e.target.value)}
          >
            <input
              {...register("salary", {
                required: "Salary is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "only number are allowed",
                },
              })}
              onKeyUp={() => {
                trigger("salary");
              }}
              className={`form-control ${
                errors.salary && "invalid"
              } text-center`}
              type="text"
              placeholder="Enter salary"
            />
            {errors.salary && (
              <small className="text-danger">{errors.salary.message}</small>
            )}
          </div>
          <div
            className="form-group"
            onChange={(e) => setEmployeeEmail(e.target.value)}
          >
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9]+\.[A-Z]{2,}$/i,
                  message: "Invalid Email address",
                },
              })}
              onKeyUp={() => {
                trigger("email");
              }}
              className={`form-control ${
                errors.email && "invalid"
              } text-center my-2`}
              placeholder="Enter Email"
            />
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </div>
          <div
            className="form-group"
            onChange={(e) => setEmployeePhone(e.target.value)}
          >
            <input
              type="text"
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value:
                    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                  message: "Invalid phone no",
                },
              })}
              onKeyUp={() => {
                trigger("phone");
              }}
              className={`form-control ${
                errors.phone && "invalid"
              } text-center`}
              placeholder="Enter Phone"
            />
            {errors.phone && (
              <small className="text-danger">{errors.phone.message}</small>
            )}
          </div>

          <div className="radio-btn ">
            Male
            <input
              className="mx-2 "
              id="male"
              value="male"
              name="gender"
              type="radio"
              onChange={(e) => setEmployeeType(e.target.value)}
            />
            Female
            <input
              className="mx-2"
              id="Female"
              value="Female"
              name="gender"
              type="radio"
              onChange={(e) => setEmployeeType(e.target.value)}
            />
            <br />
            Select City:-
            <select
              value={employee_city}
              onChange={(e) => handleChange(e)}
              className="col-sm-12 py-2 my-2 mx-2"
            >
              {city.map((city) => (
                <>
                  <option value={city.city}>{city.city}</option>
                </>
              ))}
            </select>
          </div>
          <Button variant="secondary" onClick={() => setModal1Visible(false)}>
            Close
          </Button>
          <Button variant="primary" className="mx-4 col-md-9" htmlType="submit">
            Add
          </Button>
        </form>
      </Modal>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>

    
    </div>
  );
};

export default Employee;

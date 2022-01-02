import axios from "axios";
import { useForm } from "react-hook-form";
import { Login } from "./Login";
import { city } from "./City";
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { HeaderCmp } from "./HeaderCmp";
import { Table, Button, Modal,Form, Input,Select } from "antd";
import { useNavigate } from "react-router-dom";

export const Employee = () => {
  const [show, setShow] = useState(false);

  const [editEmp,setEditEmp]=useState(null)
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal1Visible, setModal1Visible] = useState(false);
  const [form] = Form.useForm();

  const handleClose = () => setModal1Visible(false);
  const handleShow = () => setModal1Visible(true);
  const navigate=useNavigate()



const onFill=()=>{
  form.setFieldsValue({
    employee_name: editEmp?.employee_name,
    employee_age: editEmp?.employee_age,
    employee_salary:editEmp?.employee_salary,
    employee_email:editEmp?.employee_email,
    employee_phone:editEmp?.employee_phone,
    employee_city:editEmp?.employee_city
  });
}

  const handleUpdate=(record)=>{
    onFill();
    handleShow()
    setShow(true)
    setEditEmp({...record});
    console.log(record);
  }

 const  handleAddEmployee=()=>{
  form.resetFields();
   handleShow();
   setShow(false)
 
 }

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
           
              <EditOutlined onClick={()=>handleUpdate(record)} />
         
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

  const onSubmit = async (values) => {
   
if(!show){
  setLoading(true)
  setTimeout(()=>{
    setLoading(false)
    alert("employee added successfully");
  },2000)
   
    const data = values;
    console.log(data)
    const response = await axios.post(`http://localhost:3004/data`, {
      ...data,
    });
    requestEmp();
    handleClose();
   
    form.resetFields();
  }
  else {

    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
      alert("updated successfully");
    },2000)
   
    const data = values
    console.log(data.employee_city);
    const {id}=editEmp
    const response = await axios.put(`http://localhost:3004/data/${id}`, {
      ...data,
    });
    requestEmp();
    handleClose();
    form.resetFields();


  }
  
    
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

  if (!dataSource) return "Loading...";
  return (
    <div>

      <HeaderCmp/>

  <span>
        {" "}
        Total_Emp:-
        <span className="text-danger">{dataSource.length}</span>
      </span>
      <div className="btn">
        <Button
          className="mx-5"
          variant="primary"
          onClick={handleAddEmployee}
        >
          Add Employee
        </Button>
      </div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
      >


      </Table>
      <Modal
        footer={null}
        title="Employee Details"
        style={{ top: 20 }}
        visible={modal1Visible}
        onOk={() => setModal1Visible(false)}
        onCancel={() => setModal1Visible(false)}
      > 
      <Form
      form={form}
      name="control-hooks"
       autoComplete="off"
       labelCol={{span:6}} 
       wrapperCol={{span:18}}
       onFinish={onSubmit}
       >
        <Form.Item name="employee_name" label='Username'
        rules={[{
          required:true,
          message:"please enter your name"
        },
        {whitespace:true},
       
        {min:3},

        {max:20},
      
      ]}
      hasFeedback
        >
           <Input placeholder="Type your name"  value={editEmp?.employee_name} />
        </Form.Item>

        <Form.Item name="employee_age" label='Age'
        
        rules={[{
          required:true,
          message:"please enter your age"
        },
        {whitespace:true},
       
      ]}
      hasFeedback
        >
          <Input placeholder="Type your age"  value={editEmp?.employee_age}/>
        </Form.Item>

        <Form.Item name="employee_salary" label='Salary'
        
        rules={[{
          required:true,
          message:"please enter your salary"
        },
        {whitespace:true},
       
      ]}
      hasFeedback
        >
          <Input placeholder="Type your salary"  value={editEmp?.employee_salary}/>
        </Form.Item>

        <Form.Item name="employee_email" label='Email'
        
        rules={[{
          required:true,
          message:"please enter your email"
        },
        {type:"email",message:'please enter a valid  email'},
       
      ]}
      hasFeedback
        >
          <Input placeholder="Type your email" value={editEmp?.employee_email}/>
        </Form.Item>

        <Form.Item name="employee_phone" label='Phone'
        
        rules={[{
          required:true,
          message:"please enter your phone"
        },
        {whitespace:true},

        {min:10},

        {max:10,
        message:"mobile no must be 10 digit"
        }

       
      ]}
      hasFeedback
        
        >
          <Input placeholder="Type your phone" value={editEmp?.employee_phone}/>
        </Form.Item>
        <Form.Item name="employee_type" label='Gender' requiredMark="optional">
         <Select>
           <Select.Option value="male">Male</Select.Option>
           <Select.Option value="female">FeMale</Select.Option>
         </Select>
        </Form.Item>
        <Form.Item name="employee_city" label='City' requiredMark="optional">
         <Select>
           <Select.Option value="indore">indore</Select.Option>
           <Select.Option value="dewas">dewas</Select.Option>
           <Select.Option value="ujjain">ujjain</Select.Option>
           <Select.Option value="bhopal">bhopal</Select.Option>
           
         </Select>
        </Form.Item>
        {show ?
        <Form.Item   wrapperCol={{ offset:6,
          span:18}}>
        <Button block type="primary"  htmlType="submit">
          update
        </Button>
        </Form.Item>
        :
        <Form.Item   wrapperCol={{
          offset:6,
          span:18}}>
        <Button block type="primary"  htmlType="submit">
          Add
        </Button>
        </Form.Item>
        }
        <Form.Item   wrapperCol={{
          offset:6,
          span:25 }}>
        <Button block type="primary"  ghost onClick={handleClose}>
        close
        </Button>
        </Form.Item>
      </Form>
      </Modal>
      <div className="login">
      <Login dataSource={dataSource}/>
      </div>
   
    </div>
  );
};

export default Employee;

import axios from "axios";
import { Table, Button, Alert, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { city } from "./City";
import React, { useEffect, useState } from "react";

export const Employee = () => {
  const [show, setShow] = useState(false);
  const [emp, setEmp] = useState([]);
  const [employee_name, setName] = useState("");
  const [employee_age, setAge] = useState("");
  const [employee_salary, setSalary] = useState("");
  const [employee_email, setEmployeeEmail] = useState("");
  const [employee_phone, setEmployeePhone] = useState("");
  const [employee_type, setEmployeeType] = useState("");
  const [employee_city,setEmployeeCity]=useState("")
  console.log(employee_name)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    watch,
  } = useForm();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const requestEmp = async () => {
    const response = await axios.get(`http://localhost:3004/data`);
    setEmp(response.data);
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
      employee_city
    };
    const response = await axios.post(`http://localhost:3004/data`, {
      ...data,
    });
    requestEmp();
    handleClose();
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
  const handleChange=(e)=>{
    setEmployeeCity(e.target.value);
  }

  if (!emp) return "Loading...";
  return (
    <div>
      <Alert className="my-3 col-md-10 mx-auto" variant="primary">
        <span>
          {" "}
          Total_Emp:-
          <span className="text-danger">{emp.length}</span>
        </span>
        <div className="btn">
          <Button className="mx-5" variant="primary" onClick={handleShow}>
            Add Employee
          </Button>
        </div>
      </Alert>

      <h3 className="text-warning text-center">
        Employee Detailes
      </h3>
      <Table striped bordered hover className="my-3">
        <thead>
          <tr>
            <th>emp_Name</th>
            <th>emp_Age</th>
            <th>emp_Salary</th>
            <th>emp_Email</th>
            <th>emp_Phone</th>
            <th>emp_City</th>
            <th>emp_Type</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {emp.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.employee_name}</td>
              <td>{emp.employee_age}</td>
              <td>{emp.employee_salary}</td>
              <td>{emp.employee_email}</td>
              <td>{emp.employee_phone}</td>
              <td>{emp.employee_city}</td>
              <td>{emp.employee_type}</td>
              <td>
                {" "}
                <Link to={`/emp/${emp.id}`}>
                  <Button className="btn btn-success">update</Button>{" "}
                </Link>{" "}
                <Button
                  onClick={() => deleteEmp(emp.id)}
                  className="btn-danger"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Employee </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="form-group" onChange={(e) => setName(e.target.value)}>
              <input
                {...register("name", { required: "Name is required",
                minLength: {
                  value: 3,
                  message: "minimum allowed length is 3 ",
                },
                maxLength: {
                  value: 20,
                  message: "Maximum allowed length is 20 ",
                }, })}
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
            <div className="form-group"  onChange={(e) => setAge(e.target.value)}>
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
            <div className="form-group"  onChange={(e) => setSalary(e.target.value)}>
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
            <div className="form-group"  onChange={(e) => setEmployeeEmail(e.target.value)}>
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
            <div className="form-group" onChange={(e) => setEmployeePhone(e.target.value)}>
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

            <div className="radio-btn text-center">
              Male
              <input
                className="mx-2"
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
              /><br/>
          City:-
         <select
           value={employee_city}
           onChange={(e) => handleChange(e)}
           className="col-sm-4 my-3 mx-2"
         >
           {city.map(city=>(
             <>
        <option value={city.city}>{city.city}</option>
       
        </>
        ))}
      </select>
            </div>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" className="mx-4 col-md-9" type="submit">
              Add
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Employee;

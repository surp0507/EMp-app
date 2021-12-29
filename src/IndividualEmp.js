import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import axios from "axios";

export const IndividualEmp = () => {
  const [employee_name, setName] = useState("");
  const [employee_age, setAge] = useState("");
  const [employee_salary, setSalary] = useState("");
  const [employee_email, setEmployeeEmail] = useState("");
  const [employee_phone, setEmployeePhone] = useState("");
  const [employee_type, setEmployeeType] = useState("");
  const [employee_city,setEmployeeCity]=useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    watch,
  } = useForm();

  const navigate = useNavigate();

  const { id } = useParams();
  const requestData = async () => {
    const response = await axios.get(`http://localhost:3004/data/${id}`);
    console.log(response.data);
    const {
      employee_name,
      employee_age,
      employee_salary,
      employee_email,
      employee_phone,
      employee_type,
      employee_city
    } = response.data;
    setName(employee_name);
    setAge(employee_age);
    setSalary(employee_salary);
    setEmployeeEmail(employee_email);
    setEmployeePhone(employee_phone);
    setEmployeeCity(employee_city);
  };

  const onSubmit = async () => {
    alert("updated successfully");
    const data = {
      employee_name,
      employee_age,
      employee_salary,
      employee_email,
      employee_phone,
      employee_type,
      employee_city
    };
    const response = await axios.put(`http://localhost:3004/data/${id}`, {
      ...data,
    });

    reset();
    navigate("/");
  };

  useEffect(() => {
    requestData();
  }, []);

  return (
    <div>
      <h3 className="text-center my-3">Update employee</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="container">
        <div className="form-group " onChange={(e) => setName(e.target.value)}>
          <label htmlFor="name" className="text-success">Name:-</label>
          <input
            type="text"
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
            className={` form-control ${errors.name && "invalid"} text-center`}
            placeholder="name"
            value={employee_name}
            autocomplete="off"
          />
          {errors.name && (
            <small className="text-danger">{errors.name.message}</small>
          )}
        </div>
        <div className="for-group" onChange={(e) => setAge(e.target.value)}>
        <label htmlFor="name" className="text-success">Age:-</label>
          <input
            type="text"
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
            className={` form-control ${
              errors.age && "invalid"
            } my-1 text-center`}
            value={employee_age}
            placeholder="age"
            autocomplete="off"
          />
          {errors.age && (
            <small className="text-danger">{errors.age.message}</small>
          )}
        </div>
        <div className="form-group" onChange={(e) => setSalary(e.target.value)}>
        <label htmlFor="name" className="text-success">Salary:-</label>
          <input
            type="text"
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
            className={`form-control ${errors.salary && "invalid"} text-center`}
            value={employee_salary}
            placeholder="salary"
          />
          {errors.salary && (
            <small className="text-danger">{errors.salary.message}</small>
          )}
        </div>

        <div
          className="form-group"
          onChange={(e) => setEmployeeEmail(e.target.value)}
        >
          <label htmlFor="email" className="text-success">email:-</label>
          <input
            type="text"
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
            value={employee_email}
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
          <label htmlFor="phone" className="text-success">phone:-</label>
          <input
            type="text"
            value={employee_phone}
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
            className={`form-control ${errors.phone && "invalid"} text-center`}
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
        </div>
        <div className="my-2"   onChange={(e)=>setEmployeeCity(e.target.value)}>
          <label className="text-success">City:-</label>
        <input type="text" 
        {...register("city", { required: "City is required",
        minLength: {
          value: 3,
          message: "minimum allowed length is 3 ",
        },
        maxLength: {
          value: 20,
          message: "Maximum allowed length is 20 ",
        }, })}
        onKeyUp={() => {
          trigger("city");
        }}
        value={employee_city} 
        className="form-control"/>
         {errors.name && (
            <small className="text-danger">{errors.city.message}</small>
          )}
        </div>
        <Button type="submit" className="col-md-12" >
          update
        </Button>
      </form>
    </div>
  );
};

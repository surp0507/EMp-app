import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import axios from "axios";

export const IndividualEmp = () => {
  const [employee_name, setName] = useState("");
  const [employee_age, setAge] = useState("");
  const [employee_salary, setSalary] = useState("");
  const [employee_email,setEmployeeEmail]=useState('')
  const [employee_phone,setEmployeePhone]=useState('')
  const [employee_type,setEmployeeType]=useState('')

  const navigate = useNavigate();

  const { id } = useParams();
  const requestData = async () => {
    const response = await axios.get(`http://localhost:3004/data/${id}`);
    console.log(response.data);
    const { employee_name, employee_age, employee_salary,
    employee_email,employee_phone,employee_type } = response.data;
    setName(employee_name);
    setAge(employee_age);
    setSalary(employee_salary);
    setEmployeeEmail(employee_email);
    setEmployeePhone(employee_phone);
  };


  useEffect(() => {
    requestData();
  }, []);

  const handleUpdate = async () => {
    alert("updated successfully")
    const data = { employee_name, employee_age, employee_salary ,employee_email,employee_phone,employee_type};
    const response = await axios.put(`http://localhost:3004/data/${id}`, {
      ...data,
    });
    navigate("/");
  };

  return (
    <div>
      <h3 className="text-center my-3">Update employee</h3>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        className=" form-control text-center"
        placeholder="name"
        value={employee_name}
      />
      <input
        type="text"
        className=" form-control  my-1 text-center"
        onChange={(e) => setAge(e.target.value)}
        value={employee_age}
        placeholder="age"
      />
      <input
        type="text"
        className="form-control text-center"
        onChange={(e) => setSalary(e.target.value)}
        value={employee_salary}
        placeholder="salary"
      />

          <input type="text"
          onChange={(e)=>setEmployeeEmail(e.target.value)}
             className="form-control text-center my-2"
             value={employee_email}
            placeholder="Enter Email" />
            <input type="text"
            value={employee_phone}
            onChange={(e)=>setEmployeePhone(e.target.value)}
             className="form-control text-center"
            placeholder="Enter Phone" />

            <div className="radio-btn text-center">
         Male
        <input
          className="mx-2"
          id="male"
          value="male"
          name="gender"
          type="radio"
          onChange={(e)=>setEmployeeType(e.target.value)}
        />
        Female
        <input
        className="mx-2"
          id="Female"
          value="Female"
          name="gender"
          type="radio"
          onChange={(e)=>setEmployeeType(e.target.value)}
          
        />

            </div>
      <br /> <br />
      <Button className="col-md-10" onClick={handleUpdate}>update</Button>
    </div>
  );
};

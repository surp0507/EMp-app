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

  const navigate = useNavigate();

  const { id } = useParams();
  const requestData = async () => {
    const response = await axios.get(`http://localhost:3004/data/${id}`);
    console.log(response.data);
    const { employee_name, employee_age, employee_salary } = response.data;
    setName(employee_name);
    setAge(employee_age);
    setSalary(employee_salary);
  };

  useEffect(() => {
    requestData();
  }, []);

  const handleUpdate = async () => {
    alert("updated successfully")
    const data = { employee_name, employee_age, employee_salary };
    const response = await axios.put(`http://localhost:3004/data/${id}`, {
      ...data,
    });
    navigate("/");
  };

  return (
    <div>
      <h3 className="text-warning my-3 ">Individual Employee</h3>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        className=" col-md-8 text-center"
        placeholder="name"
        value={employee_name}
      />
      <br />
      <input
        type="text"
        className=" col-md-8  my-2 text-center"
        onChange={(e) => setAge(e.target.value)}
        value={employee_age}
        placeholder="age"
      />
      <br />
      <input
        type="text"
        className=" col-md-8 text-center"
        onChange={(e) => setSalary(e.target.value)}
        value={employee_salary}
        placeholder="salary"
      />
      <br /> <br />
      <Button className="col-md-8" onClick={handleUpdate}>update</Button>
    </div>
  );
};

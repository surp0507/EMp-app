import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "antd";
import axios from "axios";

export const IndividualEmp = () => {
  const [dataSource, setDataSource] = useState([]);
  console.log(dataSource);
  const { id } = useParams();
  const requestData = async () => {
    const response = await axios.get(`http://localhost:3004/data/${id}`);
    console.log(response.data);
    setDataSource([response.data]);
  };

  useEffect(() => {
    requestData();
  }, []);

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
  ];

  return (
    <div>
      <h3 className="text-center my-3">Update employee</h3>

      <Table columns={columns} dataSource={dataSource}></Table>
    </div>
  );
};

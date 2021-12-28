import axios from "axios";
import { Table, Button, Alert, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { Component } from "react";

export default class Employee extends Component {
  state = {
    emp: [],
    show: false,
    employee_name: "",
    employee_name: "",
    employee_salary: "",
  };

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  requestEmp = async () => {
    const response = await axios.get(`http://localhost:3004/data`);
    this.setState({ emp: response.data });
  };

  componentDidMount() {
    this.requestEmp();
  }

  addEmployee = async () => {
    alert("employee added successfully")
    const { employee_name, employee_age, employee_salary } = this.state;
    const data = { employee_name, employee_age, employee_salary };
    const response = await axios.post(`http://localhost:3004/data`, {
      ...data,
    });
    this.requestEmp();
  };

  deleteEmp = async (id) => {
    alert("deleted successfully")
    const response = await axios.delete(`http://localhost:3004/data/${id}`);
    console.log(response.data);
    this.requestEmp();
  };

  render() {
    const { employee_name, employee_age, employee_salary } = this.state;
    console.log(employee_name, employee_age, employee_salary);

    const { emp, show } = this.state;
    if (!this.state.emp) return "Loading...";
    return (
      <div>
        <Alert className="my-5 col-md-8 mx-auto" variant="primary">
          Total_Emp:-{this.state.emp.length}
          <div className="btn">
            <Button variant="primary" onClick={this.handleShow}>
              Add Employee
            </Button>
          </div>
        </Alert>

        <h3 className="text-warning">Employee Detailes</h3>
        <Table striped bordered hover className="my-3">
          <thead>
            <tr>
              <th>emp_Name</th>
              <th>emp_Age</th>
              <th>emp_Salary</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {emp.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.employee_name}</td>
                <td>{emp.employee_age}</td>
                <td>{emp.employee_salary}</td>
                <td>
                  {" "}
                  <Link to={`/emp/${emp.id}`}>
                    <Button className="btn btn-success">update</Button>{" "}
                  </Link>{" "}
                  <Button
                    onClick={() => this.deleteEmp(emp.id)}
                    className="btn-danger"
                  >
                    Delete
                  </Button>
                </td>
              
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> Employee </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              onChange={(e) => this.setState({ employee_name: e.target.value })}
              type="text"
              className="form-control text-center"
              placeholder="Enter name"
            />
            <input
              onChange={(e) => this.setState({ employee_age: e.target.value })}
              type="text"
              className="my-2 form-control text-center"
              placeholder="Enter age"
            />
            <input
              onChange={(e) =>
                this.setState({ employee_salary: e.target.value })
              }
              className="form-control text-center"
              type="text"
              placeholder="Enter salary"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.addEmployee}>
              Add Emp
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

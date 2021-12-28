import axios from "axios";
import { Table, Button, Alert, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactDom from "react-dom";
import React, { Component } from "react";

export default class Employee extends Component {
  state = {
    emp: [],
    show: false,
    employee_name: "",
    employee_name: "",
    employee_salary: "",
    employee_type: "",
    employee_email: "",
    employee_phone: "",
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

  onSubmit=(data)=>{
console.log(data)
  }

  addEmployee = async () => {
    alert("employee added successfully");
    const {
      employee_name,
      employee_age,
      employee_salary,
      employee_email,
      employee_phone,
      employee_type,
    } = this.state;
    const data = {
      employee_name,
      employee_age,
      employee_salary,
      employee_email,
      employee_phone,
      employee_type,
    };
    const response = await axios.post(`http://localhost:3004/data`, {
      ...data,
    });
    this.requestEmp();
    this.handleClose();
  };

  deleteEmp = async (id) => {
    let userconfirmation = window.confirm(
      "Are you sure you want to delete this"
    );
    if (userconfirmation == true) {
      alert("deleted successfully");
      const response = await axios.delete(`http://localhost:3004/data/${id}`);
      console.log(response.data);
      this.requestEmp();
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { employee_name, employee_age, employee_salary } = this.state;

    const { emp, show } = this.state;
    if (!this.state.emp) return "Loading...";
    return (
      <div>
        <Alert className="my-3 col-md-10 mx-auto" variant="primary">
          <span>
            {" "}
            Total_Emp:-
            <span className="text-danger">{this.state.emp.length}</span>
          </span>
          <div className="btn">
            <Button
              className="mx-5"
              variant="primary"
              onClick={this.handleShow}
            >
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
              <th>emp_Email</th>
              <th>emp_Phone</th>
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
                <td>{emp.employee_type}</td>
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
           
            <div className="form-group">
              <input
                onChange={(e) =>
                  this.setState({ employee_name: e.target.value })
                }
             
                type="text"
                className="form-control text-center"
                placeholder="Enter name"
              />
              <small className="text-danger">name is required</small>
            </div>
            <div className="form-group">
              <input
                onChange={(e) =>
                  this.setState({ employee_age: e.target.value })
                }
                type="text"
               
                className="my-2 form-control text-center"
                placeholder="Enter age"
              />
              <small className="text-danger">age is required</small>
            </div>
            <div className="form-group">
              <input
                onChange={(e) =>
                  this.setState({ employee_salary: e.target.value })
                }
              
                className="form-control text-center"
                type="text"
                placeholder="Enter salary"
              />
              <small className="text-danger">salary is required</small>
            </div>
            <div className="form-group">
              <input
                type="text"
                onChange={(e) =>
                  this.setState({ employee_email: e.target.value })
                }
                className="form-control text-center my-2"
               
                placeholder="Enter Email"
              />
              <small className="text-danger">email is required</small>
            </div>
            <div className="form-group">
              <input
                type="text"
                onChange={(e) =>
                  this.setState({ employee_phone: e.target.value })
                }
                className="form-control text-center"
               
                placeholder="Enter Phone"
              />
              <small className="text-danger">phone is required</small>
            </div>

            <div className="radio-btn text-center">
              Male
              <input
                className="mx-2"
                id="male"
                value="male"
                name="gender"
                type="radio"
                onChange={(e) =>
                  this.setState({ employee_type: e.target.value })
                }
              />
              Female
              <input
                className="mx-2"
                id="Female"
                value="Female"
                name="gender"
                type="radio"
                onChange={(e) =>
                  this.setState({ employee_type: e.target.value })
                }
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.addEmployee}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

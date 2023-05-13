import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import './App.css';

import addEmployeeLogo from './assets/create-logo.png';
import axios from 'axios';

function App() {

  // Api base Url
  const baseUrl = "https://localhost:7076/api/employees";

  const [data, setData] = useState([]);

  // Include modal states
  const [includeModal, setIncludeModal] = useState(false);

  // Edit modal states
  const [editModal, setEditModal] = useState(false);

  // Delete modal states
  const [deleteModal, setDeleteModal] = useState(false);

  // Obtains data from inputs
  const [selectedEmployee, setSelectedEmployee] = useState({
    id: '',
    name: '',
    age: '',
    active: 0
  });

  // Open and close include modal 
  const openCloseIncludeModal = () => {
    setIncludeModal(!includeModal);
  }

  // Open and close edit modal
  const openCloseEditModal = () => {
    setEditModal(!editModal);
  }

  // Open and close delete modal
  const openCloseDeleteModal = () => {
    setDeleteModal(!deleteModal);
  }

  // Select employee to edit
  const selectEmployee = (employee, option) => {
    setSelectedEmployee(employee)
      ? (option === "Edit") && openCloseEditModal()
      : (option === "Delete") && openCloseDeleteModal();
  }

  // Get input from include modal
  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setSelectedEmployee({
      ...selectedEmployee, // Evaluate checkbox to know if it is a active or not employee
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    })
  }

  // Get Request
  const getEmployees = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data.data)
      }).catch(error => {
        console.log(error);
      })
  }

  // Post Request
  const postEmployees = async () => {
    delete selectedEmployee.id;
    selectedEmployee.id = parseInt(selectedEmployee.age);
    selectedEmployee.active = selectedEmployee.active ? true : false; // 1 : 0
    await axios.post(baseUrl, selectedEmployee)
      .then(response => {
        setData(data.concat(response.data));
        openCloseIncludeModal();
      }).catch(error => {
        console.log(error.response.data);
      });
  }

  // Put Request
  const putEmployees = async () => {
    selectedEmployee.age = parseInt(selectedEmployee.age);
    selectedEmployee.active = selectedEmployee.active ? true : false;
    await axios.put(baseUrl + "/", selectedEmployee)
      .then(response => {
        var answer = response.data; // Sent input data
        var auxiliaryData = data; // Api data

        // Search each id till find the correspondent one 
        // then map the input data with selected employee from api
        auxiliaryData.forEach(employee => {
          if (employee.id === selectedEmployee.id) {
            employee.name = answer.name;
            employee.age = answer.age;
            employee.active = answer.active;
          }
        });
        openCloseEditModal();
      }).catch(error => {
        console.log(error.response.data);
      })
  }

  // Use Effect to work with server effects, 
  useEffect(() => {
    getEmployees()
  }, []);

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg opacity-75 navbar-dark bg-primary">
        <a className="navbar-brand m-1 border rounded" href='http://localhost:3000'>&nbsp;Employees System&nbsp;</a>
        <ul className="navbar-nav me-auto" />
      </nav>
      <header id="CreateHeader">
        <img id="AddEmployeeLogo" src={addEmployeeLogo} alt='Create' />
        <button className='btn btn-success' onClick={() => openCloseIncludeModal()}>New Employee</button>
      </header>
      <table className='table table-bordered table-hover'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Is Active?</th>
            <th className='text-center'>Options</th>
          </tr>
        </thead>
        <tbody>
          {/* Map Get Request Data from API */}
          {data.map((employee, index) => (
            <tr key={index}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.age}</td>
              <td>{employee.active ? 'Yes' : 'No'}</td>
              <td className='text-center'>
                <button className='btn btn-info text-white' onClick={() => selectEmployee(employee, "Edit")}>Edit</button> {" "}
                <button className='btn btn-danger' onClick={() => selectEmployee(employee, "Delete")}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Include Modal */}
      <Modal isOpen={includeModal}>
        <ModalHeader>Register an Employee</ModalHeader>
        <ModalBody className='form-group'>
          <div className='form-group'>
            <label>Name</label>
            <br />
            <input type='text' className='form-control' name='name' onChange={handleChange}></input>
            <br />
            <label>Age</label>
            <br />
            <input type='number' className='form-control' name='age' onChange={handleChange}></input>
            <br />
            <label>Is Active?</label>
            <br />
            <input type='checkbox' className='form-check-input' name='active' onChange={handleChange}></input>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-success' onClick={() => postEmployees()}>Register</button> {" "}
          <button className='btn btn-danger' onClick={() => openCloseIncludeModal()}>Cancel</button>
        </ModalFooter>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={editModal}>
        <ModalHeader>Edit Employee</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>Id</label>
            <br />
            <input type='text' value={selectedEmployee && selectedEmployee.id} className='form-control' readOnly />
            <br />
            <label>Name</label>
            <br />
            <input type='text' value={selectedEmployee && selectedEmployee.name} className='form-control' name='name' onChange={handleChange} />
            <br />
            <label>Age</label>
            <br />
            <input type='number' value={selectedEmployee && selectedEmployee.age} className='form-control' name='age' onChange={handleChange} />
            <br />
            <label>Age</label>
            <br />
            <input type='checkbox' name='active' checked={selectedEmployee && selectedEmployee.active} onChange={handleChange} />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={() => putEmployees()}>Edit</button> {" "}
          <button className='btn btn-secondary opacity-75' onClick={() => openCloseEditModal()}>Cancel</button>
        </ModalFooter>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={deleteModal}>
        <ModalHeader>Delete Employee</ModalHeader>
        <ModalBody>
          <div className='alert alert-danger'>
            Are you sure you want to delete this employee?
          </div>
          <div className='form-group'>
            <label>Id</label>
            <br />
            <input type='text' value={selectedEmployee && selectedEmployee.id} className='form-control' readOnly />
            <br />
            <label>Name</label>
            <br />
            <input type='text' value={selectedEmployee && selectedEmployee.name} className='form-control' readOnly />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger'>Delete</button> {" "}
          <button className='btn btn-secondary opacity-75' onClick={() => openCloseDeleteModal()}>Cancel</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
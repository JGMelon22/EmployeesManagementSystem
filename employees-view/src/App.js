import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import './App.css';

import addEmployeeLogo from './assets/create-logo.png';
import axios from 'axios';

function App() {

  // Api base Url
  const baseUrl = "https://localhost:7076/api/employees";

  const [data, setData] = useState([]);

  // include modal states
  const [includeModal, setIncludeModal] = useState(false);

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

  // Use Effect to work with server effects, 
  useEffect(() => {
    getEmployees()
  }, []);

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand m-1" href='http://localhost:3000'>Employees System</a>
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
                <button className='btn btn-info text-white'/*{onClick={}}*/>Edit</button> {" "}
                <button className='btn btn-danger' /*{onClick={}}*/>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Include Modal */}
      <Modal isOpen={includeModal}>
        <ModalHeader>Register an Employee</ModalHeader>
        <ModalBody className='form-group'>
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
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-success' onClick={() => postEmployees()}>Register</button> {" "}
          <button className='btn btn-danger' onClick={() => openCloseIncludeModal()}>Cancel</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
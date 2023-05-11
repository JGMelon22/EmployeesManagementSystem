import React, { useState, useEffect } from 'react';
import './App.css';

import addEmployeeLogo from './assets/create-logo.png';
import axios from 'axios';

function App() {

  // Api base Url
  const baseUrl = "https://localhost:7076/api/employees";

  const [data, setData] = useState([]);

  // Get Request
  const getEmployees = async () => {
    try {
      const response = await axios.get(baseUrl);
      setData(response.data.data); // Get Employees data 
    } catch (error) {
      console.log(error);
      setData([]);
    }
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
        <button className='btn btn-success' /*{onClick={}}*/>New Employee</button>
      </header>
      <table className='table table-bordered table-hover'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Is Active?</th>
            {/* <th>Business Area</th> */}
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
              {/* <td>IT</td> */}
              <td className='text-center'>
                <button className='btn btn-info text-white'/*{onClick={}}*/>Edit</button> {" "}
                <button className='btn btn-danger' /*{onClick={}}*/>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
import React from 'react';
import './App.css';

import addEmployeeLogo from './assets/create-logo.png';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand m-1" href='http://localhost:3000'>Employees System</a>
        <ul class="navbar-nav me-auto" />
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
            <th>Business Area</th>
            <th className='text-center'>Options</th>
          </tr>
        </thead>
        <tbody>
          {/* Map Get Request Data from API */}
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>20</td>
            <td>☑</td>
            <td>IT</td>
            <td className='text-center'>
              <button className='btn btn-primary'/*{onClick={}}*/>Edit</button> {" "}
              <button className='btn btn-danger' /*{onClick={}}*/>Delete</button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  );
}

export default App;
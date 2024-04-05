import React, { useState, useEffect } from 'react';
import EmployeeForm from './Components/EmployeeForm';
import EmployeeList from './Components/EmployeeList';
import LeaveTable from './Components/LeaveTable';

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Load employees from local storage on component mount
    const storedEmployees = JSON.parse(localStorage.getItem('employees'));
    if (storedEmployees) {
      setEmployees(storedEmployees);
    }
  }, []);

  const addEmployee = (employee) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newEmployee = { id, ...employee };
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    // Save updated employees to local storage
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  const deleteEmployee = (id) => {
    const updatedEmployees = employees.filter(emp => emp.id !== id);
    setEmployees(updatedEmployees);
    // Update local storage after deleting employee
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  const updateEmployee = (updatedEmployee) => {
    const updatedEmployees = employees.map(emp => {
      if (emp.id === updatedEmployee.id) {
        return updatedEmployee;
      }
      return emp;
    });
    setEmployees(updatedEmployees);
    // Update local storage after updating employee
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  return (
    <div className="App">
      <h1>Employee Management</h1>
      <EmployeeForm onSubmit={addEmployee} />
      <EmployeeList employees={employees} onDelete={deleteEmployee} onUpdate={updateEmployee} />
      <LeaveTable employees={employees} /> {/* Render the LeaveTable component */}
    </div>
  );
}

export default App;

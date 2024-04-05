import React, { useState, useEffect } from 'react';
import './leaveTable.css';

const LeaveTable = ({ employees }) => {
  const [leaveData, setLeaveData] = useState(() => {
    const storedData = localStorage.getItem('leaveData');
    return storedData ? JSON.parse(storedData) : [];
  });

  const [employeeId, setEmployeeId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [approved, setApproved] = useState(false);
  const [supervisorId, setSupervisorId] = useState('');
  const [supervisors, setSupervisors] = useState([]);

  useEffect(() => {
    localStorage.setItem('leaveData', JSON.stringify(leaveData));
  }, [leaveData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLeaveData([...leaveData, { employeeId, startDate, endDate, approved, supervisorId }]);
    setEmployeeId('');
    setStartDate('');
    setEndDate('');
    setApproved(false);
    setSupervisorId('');
  };

  const getSupervisors = () => {
    if (employeeId) {
      const selectedEmployee = employees.find(emp => emp.id === parseInt(employeeId));
      if (selectedEmployee) {
        const departmentManagers = employees.filter(emp => emp.department === selectedEmployee.department && emp.jobTitle === 'Manager');
        setSupervisors(departmentManagers);
      }
    }
  };

  useEffect(() => {
    getSupervisors();
  }, [employeeId]);

  return (
    <div>
      <h2>Leave Management</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="employee">Employee:</label>
          <select id="employee" value={employeeId} onChange={(e) => { setEmployeeId(e.target.value); }}>
            <option value="">Select Employee</option>
            {employees && employees.map((emp) => (
              <option key={emp.id} value={emp.id}>{emp.firstName} {emp.lastName}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="supervisor">Supervisor:</label>
          <select id="supervisor" value={supervisorId} onChange={(e) => setSupervisorId(e.target.value)}>
            <option value="">Select Supervisor</option>
            {supervisors.map((supervisor) => (
              <option key={supervisor.id} value={supervisor.id}>{supervisor.firstName} {supervisor.lastName}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="approved">Approved:</label>
          <input type="checkbox" id="approved" checked={approved} onChange={(e) => setApproved(e.target.checked)} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Approved</th>
            <th>Supervisor</th>
          </tr>
        </thead>
        <tbody>
          {leaveData.map((leave, index) => (
            <tr key={index}>
              <td>{employees.find(emp => emp.id === parseInt(leave.employeeId, 10))?.firstName} {employees.find(emp => emp.id === parseInt(leave.employeeId, 10))?.lastName}</td>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.approved ? 'Yes' : 'No'}</td>
              <td>{leave.supervisorId && employees.find(emp => emp.id === parseInt(leave.supervisorId, 10))?.firstName} {leave.supervisorId && employees.find(emp => emp.id === parseInt(leave.supervisorId, 10))?.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveTable;

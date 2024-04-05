import React, { useState } from 'react';
import './employeeForm.css';
import EditEmployeeForm from './EditEmployeeForm'; // Import the EditEmployeeForm component

const EmployeeForm = ({ onSubmit, employeeList }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleInitial: '',
    lastName: '',
    email: '',
    contactNumber: '',
    address: {
      province: '',
      city: '',
      baranggay: '',
      zipCode: '',
    },
    department: '',
    jobTitle: '',
    employmentType: '', // Employment type field added
    superior: '', // Superior field added
  });

  const [editingEmployeeId, setEditingEmployeeId] = useState(null);

  const departments = ['Marketing', 'Finance', 'Human Resources', 'Operations'];
  const jobTitles = ['Manager', 'Assistant Manager', 'Executive', 'Analyst'];
  const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Intern']; // Hardcoded employment type options

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      address: {
        ...prevFormData.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEmployeeId !== null) {
      const updatedEmployeeList = employeeList.map(employee => {
        if (employee.id === editingEmployeeId) {
          return { ...employee, ...formData }; // Update the employee with the new form data
        }
        return employee;
      });
      onSubmit(updatedEmployeeList); // Pass the updated employee list to the onSubmit function
      setEditingEmployeeId(null); // Reset the editing state
    } else {
      onSubmit(formData);
    }
    // Reset form data
    setFormData({
      firstName: '',
      middleInitial: '',
      lastName: '',
      email: '',
      contactNumber: '',
      address: {
        province: '',
        city: '',
        baranggay: '',
        zipCode: '',
      },
      department: '',
      jobTitle: '',
      employmentType: '',
      superior: '',
    });
  };

  const handleEditClick = (id) => {
    setEditingEmployeeId(id);
  };

  const handleEditCancel = () => {
    setEditingEmployeeId(null);
  };

  return (
    <div>
      {editingEmployeeId !== null ? (
        <EditEmployeeForm
          employee={employeeList.find(emp => emp.id === editingEmployeeId)}
          onUpdate={setFormData} // Pass setFormData to update the form data in the EditEmployeeForm
          onCancel={handleEditCancel}
        />
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Input fields for employee information */}
          <div className="input-container">
            <label className="label" htmlFor="firstName">First Name:</label>
            <input className="input-field" type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="middleInitial">Middle Initial:</label>
            <input className="input-field" type="text" name="middleInitial" value={formData.middleInitial} onChange={handleChange} placeholder="Middle Initial" />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="lastName">Last Name:</label>
            <input className="input-field" type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="email">Email:</label>
            <input className="input-field" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="contactNumber">Contact Number:</label>
            <input className="input-field" type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Contact Number" />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="province">Province:</label>
            <input className="input-field" type="text" name="province" value={formData.address.province} onChange={handleAddressChange} placeholder="Province" />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="city">City/Municipality:</label>
            <input className="input-field" type="text" name="city" value={formData.address.city} onChange={handleAddressChange} placeholder="City/Municipality" />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="baranggay">Baranggay:</label>
            <input className="input-field" type="text" name="baranggay" value={formData.address.baranggay} onChange={handleAddressChange} placeholder="Baranggay" />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="zipCode">Zip Code:</label>
            <input className="input-field" type="text" name="zipCode" value={formData.address.zipCode} onChange={handleAddressChange} placeholder="Zip Code" />
          </div>

          {/* Dropdown list for department */}
          <div className="input-container">
            <label className="label" htmlFor="department">Department:</label>
            <select className="input-field" name="department" value={formData.department} onChange={handleChange}>
              <option value="">Select Department</option>
              {departments.map(department => (
                <option key={department} value={department}>{department}</option>
              ))}
            </select>
          </div>

          {/* Dropdown list for job title */}
          <div className="input-container">
            <label className="label" htmlFor="jobTitle">Job Title:</label>
            <select className="input-field" name="jobTitle" value={formData.jobTitle} onChange={handleChange}>
              <option value="">Select Job Title</option>
              {jobTitles.map(jobTitle => (
                <option key={jobTitle} value={jobTitle}>{jobTitle}</option>
              ))}
            </select>
          </div>

          {/* Dropdown list for employment type */}
          <div className="input-container">
            <label className="label" htmlFor="employmentType">Employment Type:</label>
            <select className="input-field" name="employmentType" value={formData.employmentType} onChange={handleChange}>
              <option value="">Select Employment Type</option>
              {employmentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Display superior */}
          <div className="input-container">
            <label className="label" htmlFor="superior">Superior:</label>
            <input className="input-field" type="text" name="superior" value={formData.superior ? formData.superior.firstName + ' ' + formData.superior.lastName : ''} readOnly />
          </div>

          <button className="submit-button" type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default EmployeeForm;

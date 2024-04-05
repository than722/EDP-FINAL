import React, { useState } from 'react';

const EditEmployeeForm = ({ employee, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState(employee);

  // Define departments, jobTitles, and employmentTypes arrays
  const departments = ['Marketing', 'Finance', 'Human Resources', 'Operations'];
  const jobTitles = ['Manager', 'Assistant Manager', 'Executive', 'Analyst'];
  const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Intern'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <label className="label" htmlFor="department">Department:</label>
        <select className="input-field" name="department" value={formData.department} onChange={handleChange}>
          <option value="">Select Department</option>
          {/* Populate options from department list */}
          {departments.map(department => (
            <option key={department} value={department}>{department}</option>
          ))}
        </select>
      </div>
      <div className="input-container">
        <label className="label" htmlFor="jobTitle">Job Title:</label>
        <select className="input-field" name="jobTitle" value={formData.jobTitle} onChange={handleChange}>
          <option value="">Select Job Title</option>
          {/* Populate options from job title list */}
          {jobTitles.map(jobTitle => (
            <option key={jobTitle} value={jobTitle}>{jobTitle}</option>
          ))}
        </select>
      </div>
      <div className="input-container">
        <label className="label" htmlFor="employmentType">Employment Type:</label>
        <select className="input-field" name="employmentType" value={formData.employmentType} onChange={handleChange}>
          <option value="">Select Employment Type</option>
          {/* Populate options from employment type list */}
          {employmentTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div className="input-container">
        <label className="label" htmlFor="contactNumber">Contact Number:</label>
        <input className="input-field" type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Contact Number" />
      </div>
      <div className="input-container">
        <label className="label" htmlFor="province">Province:</label>
        <input className="input-field" type="text" name="province" value={formData.address.province} onChange={handleChange} placeholder="Province" />
      </div>
      <div className="input-container">
        <label className="label" htmlFor="city">City/Municipality:</label>
        <input className="input-field" type="text" name="city" value={formData.address.city} onChange={handleChange} placeholder="City/Municipality" />
      </div>
      <div className="input-container">
        <label className="label" htmlFor="baranggay">Baranggay:</label>
        <input className="input-field" type="text" name="baranggay" value={formData.address.baranggay} onChange={handleChange} placeholder="Baranggay" />
      </div>
      <div className="input-container">
        <label className="label" htmlFor="zipCode">Zip Code:</label>
        <input className="input-field" type="text" name="zipCode" value={formData.address.zipCode} onChange={handleChange} placeholder="Zip Code" />
      </div>
      <div className="button-container">
        <button className="submit-button" type="submit">Save</button>
        <button className="cancel-button" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default EditEmployeeForm;

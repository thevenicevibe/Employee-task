import React, { useState } from "react";
import "./App.css";

const PopupForm = ({ onClose, onAddEmployee }) => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    salary: "",
    joiningDate: "",
    relievingDate: "",
    contact: "",
    status: "active",
  });

  const [errors, setErrors] = useState({});

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onAddEmployee(formData);
      setFormData({
        name: "",
        dob: "",
        salary: "",
        joiningDate: "",
        relievingDate: "",
        contact: "",
        status: "active",
      });
      onClose();
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Add New Employee</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div>
            <label>DOB:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleFormChange}
            />
          </div>

          <div>
            <label>Salary:</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleFormChange}
            />
          </div>

          <div>
            <label>Joining Date:</label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleFormChange}
            />
          </div>

          <div>
            <label>Relieving Date:</label>
            <input
              type="date"
              name="relievingDate"
              value={formData.relievingDate}
              onChange={handleFormChange}
            />
          </div>

          <div>
            <label>Contact:</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleFormChange}
            />
          </div>

          <div>
            <label>Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleFormChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button type="submit">Add Employee</button>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;

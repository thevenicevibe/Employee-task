import React, { useState, useEffect } from "react";
import axios from "axios";
import PopUpForm from "./PopUpForm";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    salary: "",
    joiningDate: "",
    relievingDate: "",
    contact: "",
    status: "active",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/api/employees");
    setEmployees(response.data);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/employees", formData);
    setFormData({
      name: "",
      dob: "",
      salary: "",
      joiningDate: "",
      relievingDate: "",
      contact: "",
      status: "active",
    });
    fetchData();
  };

  const handleAddEmployee = async (newEmployeeData) => {
    await axios.post('http://localhost:5000/api/employees', newEmployeeData);
    fetchData();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/employees/${id}`);
    fetchData();
  };

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div>
      <h1>Employee Management</h1>
      <button onClick={openPopup}>Add Employee</button>

      {isPopupOpen && (
        <PopUpForm onClose={closePopup} onAddEmployee={handleAddEmployee} />
      )}

      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Salary</th>
            <th>Joining Date</th>
            <th>Relieving Date</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.dob}</td>
              <td>{employee.salary}</td>
              <td>{employee.joiningDate}</td>
              <td>{employee.relievingDate}</td>
              <td>{employee.contact}</td>
              <td>{employee.status}</td>
              <td>
                <button onClick={() => handleDelete(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

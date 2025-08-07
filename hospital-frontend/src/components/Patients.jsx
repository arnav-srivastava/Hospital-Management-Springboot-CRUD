import React, { useState, useEffect } from "react";
import "../index.css";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token"); // Get JWT from localStorage

  useEffect(() => {
    fetchPatients();
  }, []);

  // Fetch all patients
  const fetchPatients = () => {
    fetch("http://localhost:8080/api/v1/patients", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch patients");
        return res.json();
      })
      .then((data) => setPatients(data))
      .catch((err) => console.error("Error fetching patients:", err));
  };

  // Add or update patient
  const handleAddOrUpdatePatient = () => {
    const patientData = { name, age, gender };
    const url = editingId
      ? `http://localhost:8080/api/v1/patients/${editingId}`
      : "http://localhost:8080/api/v1/patients";

    const method = editingId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(patientData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save patient");
        return res.json();
      })
      .then(() => {
        fetchPatients();
        resetForm();
      })
      .catch((err) => console.error("Error saving patient:", err));
  };

  // Edit patient
  const handleEdit = (patient) => {
    setName(patient.name);
    setAge(patient.age);
    setGender(patient.gender);
    setEditingId(patient.id);
  };

  // Delete patient
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      fetch(`http://localhost:8080/api/v1/patients/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to delete patient");
          setPatients((prev) => prev.filter((p) => p.id !== id));
        })
        .catch((err) => console.error("Error deleting patient:", err));
    }
  };

  // Reset form fields
  const resetForm = () => {
    setName("");
    setAge("");
    setGender("");
    setEditingId(null);
  };

  return (
    <div className="container">
      <h2>Patients</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <button onClick={handleAddOrUpdatePatient}>
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>
                  <button
                    className="update-btn"
                    onClick={() => handleEdit(patient)}
                  >
                    Edit
                  </button>
                  <button
                    className="del-btn"
                    onClick={() => handleDelete(patient.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No patients found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

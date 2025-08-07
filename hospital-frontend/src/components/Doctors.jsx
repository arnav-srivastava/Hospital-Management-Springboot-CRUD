// import React, { useState, useEffect } from "react";
// import "../index.css";

// export default function Doctors() {
//   const [doctors, setDoctors] = useState([]);
//   const [name, setName] = useState("");
//   const [specialization, setSpecialization] = useState("");
//   const [editingId, setEditingId] = useState(null); // Track editing doctor

//   // Fetch doctors when component loads
//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const fetchDoctors = () => {
//     fetch("http://localhost:8080/api/v1/doctors")
//       .then((res) => res.json())
//       .then((data) => setDoctors(data))
//       .catch((err) => console.error("Error fetching doctors:", err));
//   };

//   const handleAddOrUpdateDoctor = () => {
//     const doctorData = { name, speciality: specialization };

//     if (editingId) {
//       // Update existing doctor
//       fetch(`http://localhost:8080/api/v1/doctors/${editingId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(doctorData),
//       })
//         .then((res) => res.json())
//         .then(() => {
//           fetchDoctors();
//           setName("");
//           setSpecialization("");
//           setEditingId(null);
//         })
//         .catch((err) => console.error("Error updating doctor:", err));
//     } else {
//       // Add new doctor
//       fetch("http://localhost:8080/api/v1/doctors", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(doctorData),
//       })
//         .then((res) => res.json())
//         .then(() => {
//           fetchDoctors();
//           setName("");
//           setSpecialization("");
//         })
//         .catch((err) => console.error("Error adding doctor:", err));
//     }
//   };

//   const handleEdit = (doctor) => {
//     setName(doctor.name);
//     setSpecialization(doctor.speciality);
//     setEditingId(doctor.id);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this doctor?")) {
//       fetch(`http://localhost:8080/api/v1/doctors/${id}`, {
//         method: "DELETE",
//       })
//         .then(() => {
//           setDoctors(doctors.filter((doc) => doc.id !== id));
//         })
//         .catch((err) => console.error("Error deleting doctor:", err));
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Doctors</h2>
//       <div className="form-group">
//         <input
//           type="text"
//           placeholder="Doctor Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Specialization"
//           value={specialization}
//           onChange={(e) => setSpecialization(e.target.value)}
//         />
//         <button onClick={handleAddOrUpdateDoctor}>
//           {editingId ? "Update" : "Add"}
//         </button>
//       </div>

//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Specialization</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {doctors.length > 0 ? (
//             doctors.map((doctor) => (
//               <tr key={doctor.id}>
//                 <td>{doctor.id}</td>
//                 <td>{doctor.name}</td>
//                 <td>{doctor.speciality}</td>
//                 <td>
//                   <button className="update-btn" onClick={() => handleEdit(doctor)}>Edit</button>
//                   <button className="del-btn" onClick={() => handleDelete(doctor.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4" style={{ textAlign: "center" }}>
//                 No doctors found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import "../index.css";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Get JWT from localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    fetch("http://localhost:8080/api/v1/doctors", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch doctors");
        return res.json();
      })
      .then((data) => setDoctors(data))
      .catch((err) => console.error("Error fetching doctors:", err));
  };

  const handleAddOrUpdateDoctor = () => {
    const doctorData = { name, speciality: specialization };

    if (editingId) {
      // Update doctor
      fetch(`http://localhost:8080/api/v1/doctors/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(doctorData),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to update doctor");
          return res.json();
        })
        .then(() => {
          fetchDoctors();
          resetForm();
        })
        .catch((err) => console.error("Error updating doctor:", err));
    } else {
      // Add doctor
      fetch("http://localhost:8080/api/v1/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(doctorData),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to add doctor");
          return res.json();
        })
        .then(() => {
          fetchDoctors();
          resetForm();
        })
        .catch((err) => console.error("Error adding doctor:", err));
    }
  };

  const handleEdit = (doctor) => {
    setName(doctor.name);
    setSpecialization(doctor.speciality);
    setEditingId(doctor.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      fetch(`http://localhost:8080/api/v1/doctors/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to delete doctor");
          setDoctors(doctors.filter((doc) => doc.id !== id));
        })
        .catch((err) => console.error("Error deleting doctor:", err));
    }
  };

  const resetForm = () => {
    setName("");
    setSpecialization("");
    setEditingId(null);
  };

  return (
    <div className="container">
      <h2>Doctors</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Doctor Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        />
        <button onClick={handleAddOrUpdateDoctor}>
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Specialization</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.id}</td>
                <td>{doctor.name}</td>
                <td>{doctor.speciality}</td>
                <td>
                  <button
                    className="update-btn"
                    onClick={() => handleEdit(doctor)}
                  >
                    Edit
                  </button>
                  <button
                    className="del-btn"
                    onClick={() => handleDelete(doctor.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No doctors found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

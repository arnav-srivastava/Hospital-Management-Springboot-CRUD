import React, { useEffect, useState } from "react";
import api from "../api";

export default function PatientForm({ refresh, editing, setEditing }) {
  const [form, setForm] = useState({ name: "", age: "", gender: "" });

  useEffect(() => {
    if (editing) {
      setForm(editing);
    } else {
      setForm({ name: "", age: "", gender: "" });
    }
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      api.put(`/patients/${editing.id}`, form).then(() => {
        refresh();
        setEditing(null);
      });
    } else {
      api.post("/patients", form).then(() => refresh());
    }
    setForm({ name: "", age: "", gender: "" });
  };

  return (
    <form className="bg-white p-4 shadow rounded flex gap-4 items-center" onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="border p-2 rounded"/>
      <input type="number" placeholder="Age" value={form.age} onChange={(e) => setForm({...form, age: e.target.value})} className="border p-2 rounded"/>
      <select value={form.gender} onChange={(e) => setForm({...form, gender: e.target.value})} className="border p-2 rounded">
        <option value="">Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {editing ? "Update" : "Add"}
      </button>
    </form>
  );
}

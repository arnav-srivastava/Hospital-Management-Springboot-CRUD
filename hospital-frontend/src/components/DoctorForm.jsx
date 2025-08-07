import React, { useEffect, useState } from "react";
import api from "../api";

export default function DoctorForm({ refresh, editing, setEditing }) {
  const [form, setForm] = useState({ name: "", specialization: "" });

  useEffect(() => {
    if (editing) {
      setForm(editing);
    } else {
      setForm({ name: "", specialization: "" });
    }
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      api.put(`/doctors/${editing.id}`, form).then(() => {
        refresh();
        setEditing(null);
      });
    } else {
      api.post("/doctors", form).then(() => refresh());
    }
    setForm({ name: "", specialization: "" });
  };

  return (
    <form
      className="bg-white p-4 shadow rounded flex gap-4 items-center"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Specialization"
        value={form.specialization}
        onChange={(e) =>
          setForm({ ...form, specialization: e.target.value })
        }
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {editing ? "Update" : "Add"}
      </button>
    </form>
  );
}

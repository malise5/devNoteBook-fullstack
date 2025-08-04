import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function NoteForm({ isEdit = false }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({ author: "", title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    if (isEdit && id) {
      fetch(`http://localhost:8080/api/v1/notes/${id}`)
        .then((res) => res.json())
        .then((data) => setForm(data));
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? `http://localhost:8080/api/v1/notes/${id}` : "http://localhost:8080/api/v1/notes";
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save note");
        return res.json();
      })
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch(() => {
        setError("Failed to save note");
        setLoading(false);
      });
  };

  return (
    <form className="p-8 max-w-xl mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">{isEdit ? "Edit Note" : "New Note"}</h2>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Author</label>
        <input name="author" value={form.author} onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Title</label>
        <input name="title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Content</label>
        <textarea name="content" value={form.content} onChange={handleChange} className="w-full p-2 border rounded" rows={6} required />
      </div>
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700" disabled={loading}>
        {loading ? "Saving..." : isEdit ? "Update Note" : "Create Note"}
      </button>
    </form>
  );
}

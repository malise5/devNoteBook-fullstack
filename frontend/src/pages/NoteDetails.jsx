import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNote } from "../api/notes";

export default function NoteDetails() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getNote(id)
      .then((data) => {
        setNote(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load note");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!note) return <div className="p-8">Note not found.</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-2">{note.title}</h2>
      <span className="text-sm text-gray-500">{note.author}</span>
      <p className="mt-4 text-gray-700 dark:text-gray-300">{note.content}</p>
    </div>
  );
}

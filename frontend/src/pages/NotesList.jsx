import React, { useEffect, useState, useRef, useImperativeHandle, forwardRef } from "react";
import { getNotes } from "../api/notes";

const NotesList = forwardRef(function NotesList(props, ref) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceTimeout = useRef();

  const fetchNotes = () => {
    setLoading(true);
    getNotes({ page, size, search })
      .then((data) => {
        setNotes(data.content || data);
        setTotalPages(data.totalPages || 1);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load notes");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line
  }, [page, debouncedSearch]);

  useImperativeHandle(ref, () => ({
    refreshNotes: fetchNotes
  }));

  useEffect(() => {
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(debounceTimeout.current);
  }, [search]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Notes</h2>
      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(0); }}
          className="p-2 border rounded w-64"
        />
      </div>
      <ul className="space-y-4">
        {notes.map((note) => (
          <li key={note.id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow flex flex-col">
            <a href={`/notes/${note.id}`} className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">{note.title}</a>
            <span className="text-sm text-gray-500">{note.author}</span>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{note.content.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex gap-2">
        <button
          className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 disabled:opacity-50"
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        >
          Previous
        </button>
        <span className="px-3 py-1">Page {page + 1} of {totalPages}</span>
        <button
          className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 disabled:opacity-50"
          onClick={() => setPage(page + 1)}
          disabled={page + 1 >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
});

export default NotesList;

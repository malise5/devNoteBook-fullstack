// Notes API functions

// const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:8080/api/v1/notes";
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://devbook.local/api/v1/notes";

export async function getNote(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch note with Id: " + id);
  return res.json();
}

export async function getNotes({ page = 0, size = 10, sort = "createdAt,asc", search = "" } = {}) {
  let url = `${BASE_URL}/paged?page=${page}&size=${size}&sort=${sort}`;
  if (search) url += `&search=${encodeURIComponent(search)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch notes list" + search ? ` for search term: ${search}` : "");
  return res.json();
}

export async function createNote(note) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
}

export async function updateNote(id, note) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
}

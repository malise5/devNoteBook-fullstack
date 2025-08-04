import React from "react";

export default function Sidebar() {
  return (
    <aside className="bg-gray-900 text-white w-64 h-screen p-6 flex flex-col border-r border-gray-800">
      <div className="text-2xl font-bold mb-8">DevNotes</div>
      <nav className="flex flex-col gap-4">
        <a href="/" className="hover:text-indigo-400">Notes</a>
        <a href="/new" className="hover:text-indigo-400">New Note</a>
      </nav>
    </aside>
  );
}

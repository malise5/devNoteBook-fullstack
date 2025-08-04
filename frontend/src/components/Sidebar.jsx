import React, { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Mobile sidebar toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded shadow-lg"
        onClick={() => setOpen(!open)}
        aria-label="Toggle sidebar"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
      <aside
        className={`bg-gray-900 text-white w-64 h-full p-6 flex flex-col border-r border-gray-800 fixed md:static top-0 left-0 z-40 transition-transform duration-300 md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
        style={{ minHeight: "100vh" }}
      >
        <div className="text-2xl font-bold mb-8 tracking-tight flex items-center gap-2">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-indigo-400"><path d="M5 3v18M19 3v18M5 3h14M5 21h14"/></svg>
          DevNotes
        </div>
        <nav className="flex flex-col gap-4 text-lg">
          <a href="/" className="hover:text-indigo-400 transition-colors">Notes</a>
          {/* <a href="/new" onClick={() => navigate('/new')} className="hover:text-indigo-400 transition-colors">New Note</a> */}
        </nav>
      </aside>
      {/* Overlay for mobile sidebar */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden" onClick={() => setOpen(false)} />
      )}
    </>
  );
}

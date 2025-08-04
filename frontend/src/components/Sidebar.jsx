import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Placeholder for refresh function
  const onRefresh = () => {
    console.log("List refreshed!");
  };

  return (
    <>
      {/* Mobile sidebar toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded shadow-lg"
        onClick={() => setOpen(!open)}
        aria-label="Toggle sidebar"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      <aside
        className={`bg-gray-900 text-white w-64 h-full p-6 flex flex-col border-r border-gray-800 fixed md:static top-0 left-0 z-40 transition-transform duration-300 md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
        style={{ minHeight: "100vh" }}
      >
        <div className="text-2xl font-bold mb-8 tracking-tight flex items-center gap-2">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-indigo-400">
            <path d="M5 3v18M19 3v18M5 3h14M5 21h14"/>
          </svg>
          DevNotes
        </div>
        <nav className="flex flex-col gap-4 text-lg">
          <a href="/" className="hover:text-indigo-400 transition-colors">Notes</a>
        </nav>

        {/* Buttons for mobile view */}
        {open && (
          <div className="flex flex-col gap-4 mt-6">
            {/* Refresh Button */}
            <button
              className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              onClick={
                () => {
                  onRefresh();
                  setOpen(false); // Close sidebar after action
                }
              }
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 4v16h16V4H4zm8 8v4m0-4V8m0 4h4m-4 0H8"/>
              </svg>
              Refresh List
            </button>

            {/* Create Note Button */}
            <button
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
              onClick={() => {
                navigate('/new');
                setOpen(false); // Close sidebar after navigation
              }}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 4v16m8-8H4"/>
              </svg>
              Create Note
            </button>
          </div>
        )}
      </aside>

      {/* Overlay for mobile sidebar */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden" onClick={() => setOpen(false)} />
      )}
    </>
  );
}

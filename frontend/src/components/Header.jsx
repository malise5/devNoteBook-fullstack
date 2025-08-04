import React, { useState } from "react";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <header className="bg-gradient-to-r from-indigo-900 via-indigo-700 to-indigo-500 text-white px-4 md:px-8 py-4 flex items-center justify-between border-b border-indigo-700 shadow-lg sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-indigo-200"><path d="M5 3v18M19 3v18M5 3h14M5 21h14"/></svg>
        <span className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-200 to-indigo-400 bg-clip-text text-transparent">DevNotes Enterprise</span>
      </div>
      <div className="flex items-center gap-4 relative">
        <span className="hidden sm:inline text-sm text-indigo-100">Welcome, Amina!</span>
        <button
          className="focus:outline-none"
          onClick={() => setDropdownOpen((open) => !open)}
        >
          <img src="https://ui-avatars.com/api/?name=Amina+Khan&background=4f46e5&color=fff&size=32" alt="User" className="rounded-full w-9 h-9 border-2 border-indigo-300 shadow" />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 top-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg shadow-lg py-2 w-40 z-30">
            <a href="#" className="block px-4 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900 transition">Profile</a>
            <a href="#" className="block px-4 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900 transition">Settings</a>
            <a href="#" className="block px-4 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900 transition">Logout</a>
          </div>
        )}
      </div>
    </header>
  );
}

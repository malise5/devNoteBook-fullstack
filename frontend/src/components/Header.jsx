import React from "react";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white px-4 md:px-8 py-4 flex items-center justify-between border-b border-gray-700 shadow-sm sticky top-0 z-20">
      <h1 className="text-lg md:text-xl font-semibold tracking-tight">DevNotes Enterprise</h1>
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline text-sm text-gray-300">Welcome!</span>
        <img src="https://ui-avatars.com/api/?name=User&background=4f46e5&color=fff&size=32" alt="User" className="rounded-full w-8 h-8 border border-indigo-400" />
      </div>
    </header>
  );
}

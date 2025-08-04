import React from "react";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white px-8 py-4 flex items-center justify-between border-b border-gray-700">
      <h1 className="text-xl font-semibold">DevNotes Enterprise</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm">Welcome!</span>
      </div>
    </header>
  );
}

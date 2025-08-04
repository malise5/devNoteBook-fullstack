import React from "react";

export default function RightSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-72 h-full p-6 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="text-lg font-bold mb-6 text-indigo-600 dark:text-indigo-400">Quick Actions</div>
      <div className="flex flex-col gap-4">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">Create Note</button>
        <button className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition">Refresh List</button>
      </div>
      <div className="mt-8">
        <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Tips</h3>
        <ul className="text-sm text-gray-500 dark:text-gray-400 list-disc pl-4">
          <li>Click a note to view details.</li>
          <li>Use search to find notes quickly.</li>
          <li>Edit notes from the details page.</li>
        </ul>
      </div>
    </aside>
  );
}

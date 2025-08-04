import React from "react";

export default function RightSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-80 h-full p-6 bg-gradient-to-br from-white via-gray-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 border-l border-gray-200 dark:border-gray-800 shadow-xl">
      {/* User Card */}
      <div className="flex items-center gap-4 mb-8 p-4 rounded-lg bg-gradient-to-r from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800 shadow">
        <img src="https://ui-avatars.com/api/?name=User&background=4f46e5&color=fff&size=48" alt="User" className="rounded-full w-12 h-12 border-2 border-indigo-400" />
        <div>
          <div className="font-bold text-indigo-700 dark:text-indigo-300">Amina Khan</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Online</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">Quick Actions</h3>
        <div className="flex flex-col gap-3">
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
            Create Note
          </button>
          <button className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4v16h16V4H4zm8 8v4m0-4V8m0 4h4m-4 0H8"/></svg>
            Refresh List
          </button>
        </div>
      </div>

      {/* Notifications/Updates */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">Notifications</h3>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <li className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full" />
            New note added successfully.
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full" />
            All notes synced.
          </li>
        </ul>
      </div>

      {/* Help/Support Widget */}
      <div className="mt-auto">
        <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Need Help?</h3>
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Contact support or visit our <a href="#" className="text-indigo-600 dark:text-indigo-400 underline">Help Center</a>.</div>
        <button className="w-full bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-lg shadow hover:bg-indigo-100 dark:hover:bg-indigo-800 transition">Chat with Support</button>
      </div>
    </aside>
  );
}

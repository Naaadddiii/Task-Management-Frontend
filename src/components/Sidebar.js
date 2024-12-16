import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-1/4 bg-gray-800 min-h-screen p-6 flex flex-col justify-between">
      <div>
        <h2 className="font-bold text-2xl mb-6 text-white">
          Task Management App
        </h2>
        <ul className="space-y-4">
          <li>
            <Link
              to="/dashboard"
              className="block text-blue-600 hover:bg-blue-100 hover:text-blue-800 p-2 rounded-md transition-all"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/tasks"
              className="block text-blue-600 hover:bg-blue-100 hover:text-blue-800 p-2 rounded-md transition-all"
            >
              Tasks
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

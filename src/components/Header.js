import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">{""}</h1>
      <button className="bg-red-500 px-3 py-1 rounded" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Header;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await AuthService.signup(email, password);
      alert("User registered successfully");
      navigate("/");
    } catch (error) {
      console.error("Registration failed", error.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 bg-white shadow-md rounded-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 mb-4 w-full rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-4 w-full rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignup}
          className="bg-blue-500 text-white py-2 px-4 w-full rounded hover:bg-blue-600 transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;

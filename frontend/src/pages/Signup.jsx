import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = user;
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("Signup failed! Server error.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-zinc-900 p-10 rounded-2xl shadow-2xl w-full max-w-md text-white">
        <h1 className="text-4xl font-bold text-center text-red-600 mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-red-600"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-red-600"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-red-600"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

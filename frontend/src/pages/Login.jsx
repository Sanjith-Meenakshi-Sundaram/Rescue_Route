import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      alert("Please fill in both fields!");
      return;
    }

    try {
      const response = await fetch("https://rescue-route.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login Successful!");
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-zinc-900 p-10 rounded-2xl shadow-2xl w-full max-w-md text-white">
        <h1 className="text-4xl font-bold text-center text-red-600 mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
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
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-red-600"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-5 text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

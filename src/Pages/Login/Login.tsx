import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

function Login() {
  const URL = "https://dev-portfolio-backed.onrender.com/api/users/login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(URL, { email, password });
      console.log("Login successful:", res.data);
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      navigate("/profile");
    } catch (error: any) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--dark-background)] px-4">
      <div className="w-full max-w-md bg-[var(--card-background)] border border-[var(--border-subtle)] rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-[var(--text-color-main)]">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="p-3 rounded-md bg-[var(--border-subtle)] text-[var(--text-color-main)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-button)]"
            required
          />

          {/* Password */}
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="p-3 rounded-md bg-[var(--border-subtle)] text-[var(--text-color-main)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-button)]"
            required
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[var(--primary-button)] text-white py-3 rounded-md hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        {/* Optional link */}
        <p className="text-center text-sm text-gray-400 mt-4">
          Don’t have an account?{" "}
          <span
            className="text-[var(--primary-button)] cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;

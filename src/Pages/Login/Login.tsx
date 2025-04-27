import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

function Login() {
  const URL="http://localhost:5000/api/users/login"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    try {
      const res= await axios.post(URL, {
        email,
        password,
      })
      console.log("Login successful:", res.data);
      navigate("/profile");
      localStorage.setItem("userInfo", JSON.stringify(res.data));
    } catch (error:any) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center m-auto text-(--text-color-main) bg-(--card-background)  border-2 border-(--border-subtle) rounded-lg p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 w-xs">
        {/* Email Field */}
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="p-2 rounded-sm bg-(--border-subtle)"
            required
          />

          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="p-2 rounded-sm bg-(--border-subtle)"
          />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

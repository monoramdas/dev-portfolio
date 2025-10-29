import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router";

const Registration = () => {
  const URL = "https://dev-portfolio-backed.onrender.com/api/users/register";
  const navigate = useNavigate();

  const [registrationDetails, setRegistrationDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistrationDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(URL, {
        name:
          registrationDetails.firstName.trim() +
          " " +
          registrationDetails.lastName.trim(),
        email: registrationDetails.email,
        password: registrationDetails.password,
      });
      console.log("Registration successful:", response.data);
      alert("Registration successful!");
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      navigate("/profile");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--dark-background)] px-4">
      <div className="w-full max-w-md bg-[var(--card-background)] border border-[var(--border-subtle)] rounded-xl p-6 shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-[var(--text-color-main)]">
          Register
        </h1>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={registrationDetails.firstName}
            onChange={handleChange}
            className="p-3 rounded-md bg-[var(--border-subtle)] text-[var(--text-color-main)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-button)]"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={registrationDetails.lastName}
            onChange={handleChange}
            className="p-3 rounded-md bg-[var(--border-subtle)] text-[var(--text-color-main)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-button)]"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={registrationDetails.email}
            onChange={handleChange}
            className="p-3 rounded-md bg-[var(--border-subtle)] text-[var(--text-color-main)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-button)]"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={registrationDetails.password}
            onChange={handleChange}
            className="p-3 rounded-md bg-[var(--border-subtle)] text-[var(--text-color-main)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-button)]"
            required
          />

          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-[var(--primary-button)] text-white py-3 w-full rounded-md hover:opacity-90 transition"
          >
            Register
          </Button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <span
            className="text-[var(--primary-button)] cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Registration;

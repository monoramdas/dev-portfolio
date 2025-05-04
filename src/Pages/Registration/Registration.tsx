import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router";

const Registration = () => {
  const URL = "https://dev-portfolio-backed.onrender.com/api/users/register";
  const navigate=useNavigate();
  // State to hold registration details
  const [registrationDetails, setRegistrationDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setRegistrationDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(URL, {
        name: registrationDetails.firstName + "" + registrationDetails.lastName,
        email: registrationDetails.email,
        password: registrationDetails.password,
      });
      console.log("Registration successful:", response.data);
      alert("Registration successful!");
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      navigate("/profile")
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="flex flex-col text-(--text-color-main) bg-(--card-background) items-center m-auto border-2 border-(--border-subtle) rounded-lg p-4">
      <div>Register</div>
      <form className="flex flex-col gap-4 p-4 w-xs" onSubmit={(e)=>e.preventDefault()}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={registrationDetails.firstName}
          onChange={handleChange}
          className="p-2 rounded-sm bg-(--border-subtle)"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={registrationDetails.lastName}
          onChange={handleChange}
          className="p-2 rounded-sm bg-(--border-subtle)"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={registrationDetails.email}
          onChange={handleChange}
          className="p-2 rounded-sm bg-(--border-subtle)"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={registrationDetails.password}
          onChange={handleChange}
          className="p-2 rounded-sm bg-(--border-subtle)"
        />
        <Button
          type="submit"
          onClick={handleSubmit}
          className="bg-(--primary-button) text-(--text-color-main) w-full"
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default Registration;

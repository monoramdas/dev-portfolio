import axios from "axios";
import React, { useState } from "react";

const UserDetailsForm = () => {
  const URL="http://localhost:5000/api/users"
  const [formData, setFormData] = useState({
    // name: "",
    description: "",
    skills: "",
    bio: "",
    // projects: "",
  });
  const getId=localStorage.getItem("userInfo")
  const userId=JSON.parse(getId as string)._id;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.post(`${URL}/${userId}`,{
      description: formData.description,
      skills: formData.skills.split(",").map((skill) => skill.trim()),
      bio: formData.bio,
    })
    alert("User details submitted successfully!");
    console.log("Form Data Submitted:", formData);
    // Add logic to send data to the backend or handle it as needed
  };

  return (
    <div className="flex flex-col items-center justify-center m-auto text-(--text-color-main) bg-(--card-background)">
        <h2 className="text-2xl font-bold text-center mb-6">User Details Form</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 w-lg">
          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter a short description"
              rows={3}
              required
            />
          </div>

          {/* Skills Field */}
          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
              Skills
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your skills (comma-separated)"
              required
            />
          </div>

          {/* Bio Field */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write a short bio"
              rows={4}
              required
            />
          </div>

          {/* Projects Field */}
          {/* <div>
            <label htmlFor="projects" className="block text-sm font-medium text-gray-700">
              Projects
            </label>
            <textarea
              id="projects"
              name="projects"
              value={formData.projects}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="List your projects (comma-separated)"
              rows={3}
              required
            />
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      
    </div>
  );
};

export default UserDetailsForm;
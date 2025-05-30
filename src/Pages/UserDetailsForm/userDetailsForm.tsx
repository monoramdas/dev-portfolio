import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";

const UserDetailsForm = () => {
  const URL = "https://dev-portfolio-backed.onrender.com/api/users";
  const navigate = useNavigate();
  const location = useLocation();
  const { name, description, skills, bio } = location.state as {
    name: string;
    description: string;
    skills: string[];
    bio: string;
  };

  const [formData, setFormData] = useState({
    name: name || "",
    description: description || "",
    skills: skills || [""], // Initialize with an empty skill field
    bio: bio || "",
  });

  const getId = localStorage.getItem("userInfo");
  const userId = JSON.parse(getId as string)._id;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      skills: updatedSkills,
    }));
  };

  const addSkillField = () => {
    setFormData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, ""],
    }));
  };

  const removeSkillField = (index: number) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      skills: updatedSkills,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.post(`${URL}/${userId}`, {
      name: formData.name,
      description: formData.description,
      skills: formData.skills,
      bio: formData.bio,
    });
    alert("User details submitted successfully!");
    navigate("/profile");
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="flex max-w-1/2 flex-col items-center justify-center m-auto text-(--text-color-main) bg-(--card-background) rounded-lg p-4">
      <h2 className="text-2xl font-bold text-center mb-6">User Details Form</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 w-lg">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <textarea
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter name"
            required
          />
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="skills"
            className="block text-sm font-medium text-gray-700"
          >
            Skills
          </label>
          {formData.skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter a skill"
                required
              />
              <button
                type="button"
                onClick={() => removeSkillField(index)}
                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSkillField}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Add Skill
          </button>
        </div>

        {/* Bio Field */}
        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
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

        <div className="flex flex-row gap-4 justify-between mt-4">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserDetailsForm;

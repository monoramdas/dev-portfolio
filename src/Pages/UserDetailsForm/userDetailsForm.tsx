import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";

const UserDetailsForm = () => {
  const URL = "https://dev-portfolio-backed.onrender.com/api/users";
  const navigate = useNavigate();
  const location = useLocation();

  const { name, description, skills, bio } = (location.state as {
    name: string;
    description: string;
    skills: string[];
    bio: string;
  }) || { name: "", description: "", skills: [""], bio: "" };

  const [formData, setFormData] = useState({
    name: name || "",
    description: description || "",
    skills: skills?.length ? skills : [""],
    bio: bio || "",
  });

  const userId = JSON.parse(localStorage.getItem("userInfo") || "{}")?._id;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value;
    setFormData((prev) => ({ ...prev, skills: updatedSkills }));
  };

  const addSkillField = () => {
    setFormData((prev) => ({ ...prev, skills: [...prev.skills, ""] }));
  };

  const removeSkillField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
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
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--dark-background)] px-4 py-8">
      <div className="w-full max-w-2xl bg-[var(--card-background)] border border-[var(--border-subtle)] rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-[var(--text-color-main)]">
          User Details Form
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Name
            </label>
            <textarea
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-[var(--border-subtle)] text-[var(--text-color-main)] focus:ring-2 focus:ring-[var(--primary-button)] outline-none"
              placeholder="Enter your name"
              required
              rows={2}
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-[var(--border-subtle)] text-[var(--text-color-main)] focus:ring-2 focus:ring-[var(--primary-button)] outline-none"
              placeholder="Enter a short description"
              rows={3}
              required
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Skills
            </label>
            {formData.skills.map((skill, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-2"
              >
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  className="flex-1 p-3 rounded-md bg-[var(--border-subtle)] text-[var(--text-color-main)] focus:ring-2 focus:ring-[var(--primary-button)] outline-none"
                  placeholder="Enter a skill"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeSkillField(index)}
                  className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSkillField}
              className="mt-1 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              Add Skill
            </button>
          </div>

          {/* Bio */}
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-[var(--border-subtle)] text-[var(--text-color-main)] focus:ring-2 focus:ring-[var(--primary-button)] outline-none"
              placeholder="Write a short bio"
              rows={4}
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="w-full bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-full bg-[var(--primary-button)] text-white py-3 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-button)] transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetailsForm;

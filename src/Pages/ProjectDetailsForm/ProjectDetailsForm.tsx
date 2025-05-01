import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";

type Project = {
  _id?: string;
  title: string;
  description?: string;
  link?: string;
  techStack: string[] | string;
};

const ProjectDetailsForm = () => {
  const URL = "http://localhost:5000/api/projects";
  const location=useLocation();
  const navigate = useNavigate();
  const {title, description, link, techStack,id,isEdit} = location.state ||{};
  const [form, setForm] = useState<Project>({
    title: title ||"",
    description:description|| "",
    link:link|| "",
    techStack:techStack|| "",
  });
  console.log(location.state);
  console.log(form);
  
  
  const getId = localStorage.getItem("userInfo");
  const token = JSON.parse(getId as string).token;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(isEdit)
    {
      try {
        const res = await axios.patch(
          `${URL}/${id}`,
          {
            ...form,
            techStack: (form.techStack as string[]).map((s) => s.trim()),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Project details updated successfully!");
        console.log("Response:", res.data);
        navigate("/profile");
      } catch (error) {
        console.error("Error updating project details:", error);
        alert("Failed to update project details. Please try again.");
      }
      return;
    }
    try {
      const res = await axios.post(
        URL,
        {
          ...form,
          techStack: (form.techStack as string).split(",").map((s) => s.trim()),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Project details submitted successfully!");
      console.log("Response:", res.data);
      navigate("/profile");
    } catch (error) {
      console.error("Error submitting project details:", error);
      alert("Failed to submit project details. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1a1a1a] p-6 rounded-lg w-full max-w-md text-white"
      >
        <h2 className="text-xl font-bold mb-4">{"Add New Project"}</h2>

        <input
          name="title"
          placeholder="Project Title"
          value={form.title}
          onChange={handleChange}
          required
          className="mb-3 w-full p-2 rounded bg-[#333] border border-[#444]"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="mb-3 w-full p-2 rounded bg-[#333] border border-[#444]"
        />

        <input
          name="link"
          placeholder="Project Link"
          value={form.link}
          onChange={handleChange}
          className="mb-3 w-full p-2 rounded bg-[#333] border border-[#444]"
        />

        <input
          name="techStack"
          placeholder="Tech Stack (comma separated)"
          value={form.techStack}
          onChange={handleChange}
          className="mb-3 w-full p-2 rounded bg-[#333] border border-[#444]"
        />

        <div className="flex justify-end gap-2 mt-4">
        <button
            type="button"
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
            onClick={()=>navigate('/profile')}
          >
            Back
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
          >
            {isEdit?"Edit":"Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectDetailsForm;

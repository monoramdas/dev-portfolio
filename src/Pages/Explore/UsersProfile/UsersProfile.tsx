import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Badge } from "@/Components/ui/badge";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

function UsersProfile() {
  const API_URL = import.meta.env.VITE_API_URL;
  const PROJECT_URL = "https://dev-portfolio-backed.onrender.com/api/projects";
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const [userDetails, setUserDetails] = useState<any>({
    name: "",
    description: "",
    bio: "",
    skills: [],
  });
  const [projectDetails, setProjectDetails] = useState<any[]>([]);
  const userInfo = localStorage.getItem("userInfo");
  const token = userInfo ? JSON.parse(userInfo).token : "";

  const getUserDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users/${id}`);
      setUserDetails(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const getProjectDetails = async () => {
    try {
      const res = await axios.get(`${PROJECT_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjectDetails(res.data);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  useEffect(() => {
    getUserDetails();
    getProjectDetails();
  }, []);

  return (
    <div className="flex flex-col gap-6 text-(--text-color-main) bg-(--card-background) border border-(--border-subtle) rounded-lg p-4 max-w-5xl mx-auto w-full">
      {/* User Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex gap-4 items-center">
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-bold text-3xl sm:text-4xl">{userDetails.name}</h1>
            <p className="text-gray-400 text-sm sm:text-base">
              {userDetails.description}
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/explore")}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Back
        </button>
      </div>

      {/* Bio */}
      <div>
        <h2 className="font-semibold text-xl border-b border-gray-600 pb-2 mb-2">
          Bio
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          {userDetails.bio || "No bio available"}
        </p>
      </div>

      {/* Skills */}
      <div>
        <h2 className="font-semibold text-xl border-b border-gray-600 pb-2 mb-2">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {userDetails.skills.length ? (
            userDetails.skills.map((skill: any) => (
              <Badge key={skill} className="bg-blue-500 text-white text-sm">
                {skill}
              </Badge>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No skills added</p>
          )}
        </div>
      </div>

      {/* Projects */}
      <div>
        <h2 className="font-semibold text-xl border-b border-gray-600 pb-2 mb-4">
          Projects
        </h2>
        {projectDetails.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projectDetails.map((project, index) => (
              <div
                key={index}
                className="border border-(--border-subtle) rounded-lg p-4 bg-(--dark-background) shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-bold text-lg">{project.title}</h3>
                <p className="text-sm text-gray-400 mb-2">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline text-sm"
                >
                  {project.link}
                </a>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.techStack?.map((tech: string) => (
                    <Badge key={tech} className="bg-gray-700 text-white text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No projects available</p>
        )}
      </div>
    </div>
  );
}

export default UsersProfile;

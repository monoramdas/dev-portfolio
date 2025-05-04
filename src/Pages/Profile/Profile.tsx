import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { _ } from "react-router/dist/development/fog-of-war-BLArG-qZ";

function Profile() {
  const URL = "https://dev-portfolio-backed.onrender.com/api/users";
  const PRJECTURL = "https://dev-portfolio-backed.onrender.com/api/projects";
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    description: "",
    bio: "",
    skills: [],
  });
  const [projectDeatils, setProjectDetails] = useState([
    {
      _id:"",
      title: "",
      description: "",
      link: "",
      techStack: [],
    },
  ]);
  const getId = localStorage.getItem("userInfo");
  const userId = JSON.parse(getId as string)._id;
  const token = JSON.parse(getId as string).token;

  const getUserDetails = async () => {
    try {
      const resposnse = await axios.get(`${URL}/${userId}`);
      setUserDetails(resposnse.data);
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  };
  const getProjectDetails = async () => {
    try {
      const res = await axios.get(`${PRJECTURL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjectDetails(res.data);
    } catch (error) {
      console.log("Error fetching project details:", error);
    }
  };
  const handleProjectDelete= async (projectId:string) => {
    try {
      const res = await axios.delete(`${PRJECTURL}/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Project deleted successfully!");
      getProjectDetails();
    } catch (error) {
      console.log("Error deleting project:", error);
    }
  }

  useEffect(() => {
    getUserDetails();
    getProjectDetails();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 text-(--text-color-main) bg-(--card-background) border-2 border-(--border-subtle) rounded-lg p-4">
      <div>
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-row justify-between">
            <div className="flex gap-4 items-center mb-4">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-bold text-4xl">{userDetails.name}</h1>
                <p>{userDetails.description}</p>
              </div>
            </div>
            <Button onClick={() => navigate("/additional-details",{
              state:{
                name: userDetails.name,
                description: userDetails.description,
                bio: userDetails.bio,
                skills: userDetails.skills,
              }
            })}>
              Edit
            </Button>
          </div>
          <div>
            <h2 className="font-bold text-xl">Bio</h2>
            <p>{userDetails.bio}</p>
          </div>
          <div>
            <h2 className="font-bold text-xl pb-2">Skils</h2>
            <div className="flex flex-row gap-2 flex-wrap">
              {userDetails.skills.map((skill) => (
                <Badge>{skill}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex flex-row justify-between">
          <h2 className="font-bold text-xl">Projects</h2>
          <Button onClick={() => navigate("/project-details")}>Add</Button>
        </div>
        {projectDeatils.map((projectDeatils, index) => (
          <div
            key={index}
            className="flex flex-row justify-between border-2 border-(--border-subtle) rounded-lg p-2 "
          >
            <div>
              <h3 className="font-bold text-lg">{projectDeatils.title}</h3>
              <p>{projectDeatils.description}</p>
              <p>{projectDeatils.link}</p>
              <p>{projectDeatils.techStack}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Button onClick={()=>navigate("/project-details",{
                state:{
                  title: projectDeatils.title,
                  description: projectDeatils.description,
                  link: projectDeatils.link,
                  techStack: projectDeatils.techStack,
                  isEdit: true,
                  id: projectDeatils._id,
                }
              })}>Edit</Button>
              <Button onClick={()=>handleProjectDelete(projectDeatils._id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;

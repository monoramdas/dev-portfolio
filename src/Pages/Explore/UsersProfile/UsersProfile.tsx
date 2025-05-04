import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { _ } from "react-router/dist/development/fog-of-war-BLArG-qZ";

function UsersProfile() {
  const URL = "http://localhost:5000/api/users";
  const PRJECTURL = "http://localhost:5000/api/projects";
  const navigate = useNavigate();
  const location=useLocation();
  const {id}=location.state;
  const [userDetails, setUserDetails] = useState({
    name: "",
    description: "",
    bio: "",
    skills: [],
  });
  const [projectDeatils, setProjectDetails] = useState([
    {
      _id: "",
      title: "",
      description: "",
      link: "",
      techStack: [],
    },
  ]);
  const getId = localStorage.getItem("userInfo");
  const token = JSON.parse(getId as string).token;

  const getUserDetails = async () => {
    try {
      const resposnse = await axios.get(`${URL}/${id}`);
      setUserDetails(resposnse.data);
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  };
  const getProjectDetails = async () => {
    try {
      const res = await axios.get(`${PRJECTURL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjectDetails(res.data);
    } catch (error) {
      console.log("Error fetching project details:", error);
    }
  };
  
  useEffect(() => {
    getUserDetails();
    getProjectDetails();
  }, []);

  return (
    <div className="flex flex-col gap-4 text-(--text-color-main) bg-(--card-background) border-2 border-(--border-subtle) rounded-lg p-4">
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersProfile;

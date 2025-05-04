import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Explore() {
  const API_URl=import.meta.env.VITE_API_URL;
  // const URL = "http://localhost:5000/api/users";
  const navigate= useNavigate();

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${API_URl}/api/users`);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col gap-4 text-(--text-color-main) p-4">
      <h1 className="text-3xl font-bold">Explore</h1>
      <div className="flex flex-wrap gap-4">
        {users.map((user: any) => (
          <div
            key={user._id}
            className="flex flex-col gap-4 grow-1 basis-0 box-border bg-(--card-background) p-4 rounded-lg shadow-md"
          >
            <div className="flex gap-4 items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-400">
                  {user.description ?? "No description available"}
                </p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {user.skills.length === 0 ? (
                <p className="text-gray-400">Add skills</p>
              ) : (
                user.skills?.map((skill: any) => (
                  <Badge key={skill} className="bg-blue-500 text-white">
                    {skill}
                  </Badge>
                ))
              )}
            </div>
            {/* Spacer to push the button to the bottom */}
            <div className="flex-grow"></div>
            <div>
              <Button onClick={()=>navigate('/explore-users',{
                state:{
                  id: user._id,
                }

              })} className="bg-blue-500 text-white mt-4 w-full">
                View Profile
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;

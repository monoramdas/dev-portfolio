import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Explore() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/users`);
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
      <h1 className="text-3xl font-bold text-center sm:text-left">Explore</h1>

      <div
        className="
        grid grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        gap-6 
        justify-center
      "
      >
        {users.map((user) => (
          <div
            key={user._id}
            className="flex flex-col gap-4 bg-(--card-background) p-4 rounded-lg shadow-md border border-(--border-subtle)
            transition-transform duration-200 hover:scale-[1.02]"
          >
            <div className="flex gap-4 items-center">
              <Avatar className="w-16 h-16">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {user.description ?? "No description available"}
                </p>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {user.skills?.length ? (
                user.skills.map((skill: any) => (
                  <Badge key={skill} className="bg-blue-500 text-white text-sm">
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No skills added</p>
              )}
            </div>

            <Button
              onClick={() =>
                navigate("/explore-users", {
                  state: { id: user._id },
                })
              }
              className="bg-blue-500 text-white mt-auto w-full hover:bg-blue-600 transition"
            >
              View Profile
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;

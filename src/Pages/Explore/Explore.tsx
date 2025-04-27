import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Badge } from "@/Components/ui/badge";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Explore() {
  const URL = "http://localhost:5000/api/users";

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(URL);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="ml-4 text-(--text-color-main)">
      <h1 className="mb-2">Explore</h1>
      <div className="flex gap-4">
        {users.map((user: any) => (
          <div
            key={user._id}
            className="flex flex-col gap-4  bg-(--card-background) p-4 rounded-lg"
          >
            <div className="flex gap-4 items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
              <h2 className="text-2xl">{user.name}</h2>
              <p className="text-sm">{user.description ?? "Description"}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {user.skills?.map((skill: any) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;

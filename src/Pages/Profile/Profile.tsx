import { Button } from "@/Components/ui/button";
import React, { useState } from "react";

function Profile() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    description: "",
    bio: "",
    skills: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  console.log(userDetails.name,"name");
  
  return (
    <div className="flex flex-col w-full gap-4 text-(--text-color-main) bg-(--card-background) border-2 border-(--border-subtle) rounded-lg p-4 m-4">
      <div>
        {isEditing ? (
          <>
          <input
            type="text"
            onChange={handleChange}
            name="name"
            value={userDetails.name}
          />
          <Button onClick={()=>setIsEditing(false)}>Save</Button>
          </>
        ) : (
          <div className="flex flex-row ">
          <h1>{userDetails?.name || 'Name'}</h1>
          <div  className="cursor-pointer"
          onClick={()=>setIsEditing(true)}><svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706l-1.414 1.415-2.121-2.121L13.38.525a.5.5 0 0 1 .707 0l1.414 1.415zm-2.121 2.121L5 12.44V14h1.561l8.38-8.379-2.121-2.121z"/>
          </svg></div>
          {/* <Button onClick={()=>setIsEditing(true)}>Edit</Button> */}
          </div>
        )}
        <p>description</p>
      </div>
      <div>
        <h2>Bio</h2>
        <p>Bio content goes here...</p>
      </div>
      <div>
        <h2>Skils</h2>
        <p>skill 1</p>
      </div>
      <div>
        <h2>Projects</h2>
        <p>Project 1</p>
        <p>Project 2</p>
      </div>
    </div>
  );
}

export default Profile;

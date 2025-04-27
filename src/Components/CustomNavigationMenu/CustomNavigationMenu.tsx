import React from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/Components/ui/navigation-menu";
import { Navigate, useNavigate } from "react-router";
// import { Button } from "@shadcn/ui/button";

function CustomNavigationMenu() {
  const navigate =useNavigate()
  return (
    <nav>
   
        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-4">
            <NavigationMenuItem>
              <NavigationMenuLink onClick={()=>navigate("/")} className="text-gray-700 hover:text-black">
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink onClick={()=>navigate("/profile")} className="text-gray-700 hover:text-black">
                Profile
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink  onClick={()=>navigate("/explore")} className="text-gray-700 hover:text-black">
                Developers
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

    </nav>
  );
}

export default CustomNavigationMenu;
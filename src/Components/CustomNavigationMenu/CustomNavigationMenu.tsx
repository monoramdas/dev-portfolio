import React from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/Components/ui/navigation-menu";
// import { Button } from "@shadcn/ui/button";

function CustomNavigationMenu() {
  return (
    <nav>
   
        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-4">
            <NavigationMenuItem>
              <NavigationMenuLink href="/" className="text-gray-700 hover:text-black">
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/projects" className="text-gray-700 hover:text-black">
                Projects
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/developers" className="text-gray-700 hover:text-black">
                Developers
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/about" className="text-gray-700 hover:text-black">
                About
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

    </nav>
  );
}

export default CustomNavigationMenu;
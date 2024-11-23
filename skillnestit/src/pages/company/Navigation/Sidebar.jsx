import { Avatar } from "@nextui-org/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { Logout } from "../Modal/Logout";
import { ProfileSidebar } from "../ProfileSidebar";

export const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 bg-secondary h-screen text-white">
      <div className="h-36 flex justify-center items-center">
        <Avatar src="/assets/profile.png" className="w-20 h-20 text-large" />
      </div>
      <hr className="divide-white" />
      <nav className="flex flex-col p-4 text-lg">
        <NavLink
          to="/company-dashboard"
          className={({ isActive }) =>
            isActive
              ? "bg-tertiary p-2 rounded-md"
              : "text-white p-2 hover:bg-tertiary rounded-md m-1 transition-all ease-in-out"
          }
        >
          <i class="fa-solid fa-house"></i> Dashboard
        </NavLink>
        <NavLink
          to="/company-list"
          className={({ isActive }) =>
            isActive
              ? "bg-tertiary p-2 rounded-md"
              : "text-white p-2 hover:bg-tertiary rounded-md m-1 transition-all ease-in-out"
          }
        >
          <i class="fa-solid fa-list"></i> List Project
        </NavLink>
        <NavLink
          to="/company-review"
          className={({ isActive }) =>
            isActive
              ? "bg-tertiary p-2 rounded-md"
              : "text-white p-2 hover:bg-tertiary rounded-md m-1 transition-all ease-in-out"
          }
        >
          <i class="fa-solid fa-eye"></i> Review Project
        </NavLink>
         <ProfileSidebar/>
        <div className="mt-48 p-2">
          <Logout />
        </div>
      </nav>
    </div>
  );
};

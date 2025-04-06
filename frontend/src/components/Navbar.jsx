import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import LogoSmall from "./LogoSmall";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return !authUser ? (
    <></>
  ) : (
    <div className="w-full">
      <div className="flex justify-between items-center w-[95%] max-w-7xl mx-auto">
        <Link to={'/'}><LogoSmall /></Link>
        <div className="flex justify-end items-center space-x-4 py-4 text-neutral-400">
          <ThemeToggle />
          <Link to={'/profile'} className="flex items-center space-x-2">
            <User className="text-neutral-400"/>
            <span className="hidden md:inline">Profile</span> 
          </Link>
          <button className="btn btn-primary btn-sm md:btn:md" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

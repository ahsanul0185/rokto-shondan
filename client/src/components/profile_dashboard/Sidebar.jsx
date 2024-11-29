import { RiCalendar2Line, RiLockPasswordLine, RiLogoutBoxLine, RiUserFill } from "@remixicon/react";
import axios from "axios";
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { DonorContext } from "../../contexts/DonorContext";

const Sidebar = () => {

  const navigate = useNavigate();

  const { backendURL } = useContext(DonorContext);

    const handleLogout = async () => {
        try {
          await axios.post( backendURL+"/api/auth/logout", {}, { withCredentials: true });
          navigate("/login")
          window.location.reload();
        } catch (error) {
            console.log("Failed to logout, ", error)
        }
    }

  return (
    <div className="hidden md:block overflow-clip w-2/6 rounded-md">
          <NavLink to={"/profile"} className='text-gray-800  flex p-4 gap-3 font-bold hover:bg-primary hover:text-white duration-200 bg-[#ffe3f2]'>
             <RiUserFill /> <span>Profile</span>
            </NavLink>
          <NavLink to={"/profile/change-password"} className='text-gray-800  flex p-4 gap-3 font-bold hover:bg-primary hover:text-white duration-200 bg-[#ffe3f2]'>
             <RiLockPasswordLine /> <span>Change Password</span>
            </NavLink>
          <NavLink to={"/profile/manage-donate-date"} className='text-gray-800  flex p-4 gap-3 font-bold hover:bg-primary hover:text-white duration-200 bg-[#ffe3f2]'>
             <RiCalendar2Line /> <span>Manage Donate Date</span>
            </NavLink>
          <NavLink onClick={handleLogout} className='text-gray-800  flex p-4 gap-3 font-bold hover:bg-primary hover:text-white duration-200 bg-[#ffe3f2]'>
             <RiLogoutBoxLine /> <span>Logout</span>
            </NavLink>
    </div>
  );
};

export default Sidebar;

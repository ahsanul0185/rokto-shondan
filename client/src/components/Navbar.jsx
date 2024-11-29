import React, { useContext, useEffect, useState } from "react";
import { RiArrowRightLine, RiBookOpenFill, RiCalendar2Line, RiDropLine, RiHome3Fill, RiLockPasswordLine, RiLogoutBoxLine, RiMenuLine, RiUser3Fill, RiUserFill, RiUserLine } from "@remixicon/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDetectScrollDiection } from "../utils/useDetectScrollDir";
import { getCookie } from "../helper/getCookie";
import { DonorContext } from "../contexts/DonorContext";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const isScrollingUp = useDetectScrollDiection();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const { authenticated, backendURL } = useContext(DonorContext);
  const token = getCookie('accessToken')

  const location = useLocation();


  // Getting isScroll up value
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  useEffect(() => {
    setShowMobileNav(false)
  }, [location]);



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
    <>
      {/* Desktop nav */}
      <nav
        className={`hidden md:flex justify-between section-padding py-4 items-center md:fixed top-0 left-0 w-full z-[999] duration-300 ${
          isScrollingUp ? "-translate-y-0" : "md:-translate-y-full"
        } ${isScrolled && "bg-white shadow-md"}`}
      >
        <div className="bg-slate-200 flex items-center rounded-full p-4 gap-2">
          <RiDropLine /> <span className=" hidden lg:block">Rokto Sondhan</span>
        </div>

        <ul className="flex md:gap-10 lg:gap-16 items-center">
          <NavLink className="" to={"/"}>
            <span>Home</span>{" "}
            <span
              className={`h-1 w-full hidden bg-primary nav-active_indicator`}
            ></span>
          </NavLink>
          <NavLink to={"/about-us"}>
            <span>About Us</span>{" "}
            <span
              className={`h-1 w-full hidden bg-primary nav-active_indicator`}
            ></span>
          </NavLink>
          <NavLink to={"/find-blood"}>
            <span>Find Blood</span>{" "}
            <span
              className={`h-1 w-full hidden bg-primary nav-active_indicator`}
            ></span>
          </NavLink>
          {(!authenticated && !token) && (
            <NavLink to={"/register"}>
              <span>Register Now</span>{" "}
              <span
                className={`h-1 w-full hidden bg-primary nav-active_indicator`}
              ></span>
            </NavLink>
          )}

          {(!authenticated && !token) ? (
            <NavLink to={"/login"}>
              <button className="px-5 py-2 border-2 rounded-md border-primary hover:text-white hover:bg-primary transition duration-300">
                Log In
              </button>
            </NavLink>
          ) : (
            <NavLink to={"/profile"}>
              <div className=" ring-primary ring-2 rounded-full">
                <RiUserLine className="size-18  text-primary translate-y-0.5" />
              </div>
            </NavLink>
          )}
        </ul>
      </nav>

      {/* Mobile nav */}

      <nav
        className={`flex md:hidden bg-primary text-white justify-center gap-14 text-sm sm:text-base sm:gap-20 section-padding py-4 items-center fixed bottom-0 left-0 w-full z-[999] duration-300 `}
      >
        <NavLink className="flex flex-col items-center gap-1 cursor-pointer" to=
          {"/"}>
          <RiHome3Fill />
          <span>Home</span>{" "}
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1 cursor-pointer" to={"/about-us"}>
          <RiUser3Fill />
          <span>About</span>{" "}
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1 cursor-pointer" to={"/blog"}>
          <RiBookOpenFill />
          <span>Blog</span>{" "}
        </NavLink>

        <div onClick={() => setShowMobileNav(true)} className="flex flex-col items-center gap-1 cursor-pointer">
          <RiMenuLine />
          <span>Menu</span>
        </div>
      </nav>

      {/* Sidebar */}
      <ul className={`flex md:hidden fixed z-[999] top-0 right-0 w-60 h-screen shadow-2xl bg-gray-100 font-medium text-left  flex-col md:gap-8 lg:gap-16 items-start duration-300 ${showMobileNav ? "translate-x-0" : "translate-x-full"}`}>
        <RiArrowRightLine className="cursor-pointer hover:text-primary text-md m-4" onClick={() => setShowMobileNav(false)}/>
        <NavLink className="px-4 py-3 w-full font-bold text-gray-800 hover:bg-primary hover:text-white nav-indicator_mobile" to={"/"}>
          <span className="duration-200">Home</span>{" "}
      
        </NavLink>
        <NavLink className="px-4 py-3 w-full font-bold text-gray-800 hover:bg-primary hover:text-white nav-indicator_mobile" to={"/about-us"}>
          <span className="duration-200">About Us</span>{" "}
        </NavLink>
        <NavLink className="px-4 py-3 w-full font-bold text-gray-800 hover:bg-primary hover:text-white nav-indicator_mobile" to={"/find-blood"}>
          <span className=" duration-200">Find Blood</span>{" "}
        </NavLink>
        {(!authenticated && !token) && (
          <NavLink className="px-4 py-3 w-full font-bold text-gray-800 hover:bg-primary hover:text-white nav-indicator_mobile" to={"/register"}>
            <span className="duration-200">Register Now</span>{" "}
          </NavLink>
        )}

        {(!authenticated && !token) ? (
          <NavLink className="px-4 py-3 hover:text-white" to={"/login"}>
            <button className="px-5 py-2 border-2 rounded-md border-primary hover:text-white hover:bg-primary transition duration-300">
              Log In
            </button>
          </NavLink>
        ) : (
          <NavLink to={"/profile"} className="hidden md:block">
            <div className=" ring-primary ring-2 rounded-full">
              <RiUserLine className="size-18  text-primary translate-y-0.5" />
            </div>
          </NavLink>
        )}


        {/* When user is logged in */}

        {(authenticated && token) && (<>
        <hr className="border-gray-300 w-full"/>
        
          <NavLink to={"/profile"} className='text-gray-800 px-4 py-3 w-full flex gap-2 font-bold hover:bg-primary hover:text-white duration-200 nav-indicator_mobile'>
             <RiUserFill /> <span>Profile</span>
            </NavLink>
          <NavLink to={"/profile/change-password"} className='text-gray-800 px-4 py-3 w-full flex gap-2 font-bold hover:bg-primary hover:text-white duration-200'>
             <RiLockPasswordLine /> <span>Change Password</span>
            </NavLink>
          <NavLink to={"/profile/manage-donate-date"} className='text-gray-800 px-4 py-3 w-full flex gap-2 font-bold hover:bg-primary hover:text-white duration-200'>
             <RiCalendar2Line /> <span>Manage Donate Date</span>
            </NavLink>
          <NavLink onClick={handleLogout} className='text-gray-800  flex gap-2  px-4 py-3 w-full font-bold hover:bg-primary hover:text-white duration-200'>
             <RiLogoutBoxLine /> <span>Logout</span>
            </NavLink>
        
        </>)

        }


      </ul>
    </>
  );
};

export default Navbar;

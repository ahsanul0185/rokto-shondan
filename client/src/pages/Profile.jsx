import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/profile_dashboard/Sidebar";
import { DonorContext } from "../contexts/DonorContext";

const Profile = () => {

  const { setProfile, backendURL } = useContext(DonorContext);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(backendURL+"/api/profile", {
        withCredentials: true,
      });
      setProfile(response.data.donor);
    } catch (error) {
      console.log("Failed to load profile.", error);
    }
  };
  useEffect(() => {
    fetchProfileData();
  }, []);

  

  return (
    <div className="section-padding mt-32 flex items-start gap-8">
        <Sidebar />
      <div className="flex-grow">
        <Outlet />
        </div>
    </div>
  );
};

export default Profile;

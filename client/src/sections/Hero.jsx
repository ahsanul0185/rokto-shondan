import React from "react";
import hero_vector from "../assets/hero-gradient.svg";

const Hero = () => {

  

  return (
    <div className="relative md:h-screen md:flex justify-start  xl:justify-end items-center section-padding">
      <img
        src={hero_vector}
        alt="hero vector"
        className="hidden md:block absolute top-0 left-0 -z-10"
      />
      <div className="max-w-xl md:max-w-sm xl:max-w-xl md:text-right mt-32 xl:mt-14">
        <h1 className="text-4xl font-black md:text-white xl:text-[#3C3C3C] mb-4 text-left">Save Life <br /> Donate Blood </h1>
        <p className="md:text-white xl:text-gray-500 text-justify">Donating blood is one of the simplest and most impactful ways to save lives. Every donation can help someone in need, whether it's a victim of an accident, someone undergoing surgery, or a patient battling a severe illness. Your generosity could mean the difference between life and death for someone today. Join this life-saving cause and be a beacon of hope. Save a life, donate blood.</p>
        <button className="px-5 py-3 font-bold bg-black rounded-md text-white mt-7">Get Blood Now</button>
      </div>
    </div>
  );
};

export default Hero;

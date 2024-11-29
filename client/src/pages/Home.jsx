import React, { useContext } from "react";
import Hero from "../sections/Hero";
import Collabrators from "../sections/Collabrators";
import HowToGetBlood from "../sections/HowToGetBlood";
import { DonorContext } from "../contexts/DonorContext";
import { RiDropLine, RiUserLine } from "@remixicon/react";
import { NavLink } from "react-router-dom";

const Home = () => {

  const { authenticated } = useContext(DonorContext);

  return (
    <div>
      <header className="flex justify-between items-center bg-slate-100 section-padding py-4 md:hidden">
      <div className="bg-primary text-white flex items-center rounded-full p-4 gap-2">
          <RiDropLine /> Rokto Sondhan
        </div>

        {!authenticated ? (
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
      </header>

      <Hero />

      <div className="pt-40 md:pt-72 pb-28 section-padding">
        <h1 className="text-3xl font-black text-[#3C3C3C] mb-4 text-left">
          Our Misson
        </h1>
        <p className="text-gray-500 text-justify">
          Our mission is to create a community of compassion and selflessness by
          encouraging blood donation as a simple yet powerful act of humanity.
          We aim to bridge the gap between donors and those in urgent need,
          ensuring that no life is lost due to a shortage of blood. Together, we
          strive to inspire hope, save lives, and make a lasting impact on the
          health and well-being of our society.
        </p>
      </div>

      <Collabrators />
      <HowToGetBlood />
    </div>
  );
};

export default Home;

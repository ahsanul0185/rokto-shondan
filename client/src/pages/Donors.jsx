import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DonorContext } from "../contexts/DonorContext";

const Donors = () => {
  const navigate = useNavigate();
  const searchParams = useSearchParams()[0].toString();
  const { donors, setDonors, backendURL } = useContext(DonorContext);

  const fetchDonors = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/api/donors?${searchParams}`
      );
      setDonors(response.data.donors);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  return (
    <div className="section-padding mt-10 md:mt-32">
      <div className="bg-gradient-to-r from-primary to-[#b32446] py-7 px-6">
        <h1 className="text-2xl text-white font-bold">Donor List</h1>
      </div>

      <div className="mt-6">
        {/* Table for desktop view */}
        {donors ? (
          <table className="hidden md:grid w-full border-collapse border border-white">
            <thead className="">
              <tr className="bg-primary grid md:grid-cols-[1fr_2fr_2fr_2fr_2fr] lg:grid-cols-[1fr_3fr_2fr_2fr_2fr] p-0 text-white font-bold text-center">
                <td className="border border-white py-1">SI</td>
                <td className="border border-white py-1">Name</td>
                <td className="border border-white py-1">Address</td>
                <td className="border border-white py-1">Contact</td>
                <td className="border border-white py-1">Last Donated</td>
              </tr>
            </thead>

            <tbody>
              {donors.map((donor, idx) => (
                <tr
                  key={donor._id}
                  className="grid md:grid-cols-[1fr_2fr_2fr_2fr_2fr] lg:grid-cols-[1fr_3fr_2fr_2fr_2fr] p-0 text-gray-800 cursor-pointer hover:bg-[#ffa9ca] duration-200 bg-[#ffe3f2]"
                  onClick={() => navigate(`/donor/${donor._id}`)}
                >
                  <td className="border border-white py-6 text-center flex items-center justify-center">
                    {idx + 1}
                  </td>
                  <td
                    className="border border-white py-1 flex items-center px-4 font-medium
                "
                  >
                    {donor.fullName}
                  </td>
                  <td className="border border-white py-1 px-4 flex flex-col justify-center">
                    {" "}
                    <p>{donor.address}</p>
                    <p>{donor.upazilla}, { donor.district }</p>
                  </td>
                  <td className="border font-sans border-white py-1 text-center flex items-center justify-center">
                    {donor.phone}
                  </td>
                  <td className="border font-sans border-white py-1 text-center flex items-center justify-center">
                    {donor.lastDonated}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="hidden md:block"> No donors found </div>
        )}

        {/* For Mobile view */}
        {
          donors ? (<>
            <div className="grid md:hidden sm:grid-cols-2 gap-10 mt-16">
            {
              donors.map((donor, idx) => (
                <div key={idx} onClick={() => navigate(`/donor/${donor._id}`)} className="relative cursor-pointer w-full bg-secondary/40 p-5 pt-8 rounded-md">
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-12 bg-primary rounded-full text-xl grid place-items-center text-white">{idx + 1}</span>
                  <h2 className="font-bold text-xl">{donor.fullName}</h2>
                  <p className="font-semibold">{donor.address}</p>
                  <p className="font-semibold">{donor.upazilla}, {donor.district}</p>
                  <p className="font-medium"><span className="font-semibold">Contact :</span> {donor.phone}</p>
                  <p className="font-medium"><span className="font-semibold">Last Donated :</span> { donor.lastDonated }</p>
                </div>
              ))
          }
            </div>
          </>) : (
              <div className="block md:hidden">No donors found</div>
          )
        }
      </div>

      <button
        className="border border-primary px-5 py-2 rounded-md text-primary my-10"
        onClick={() => navigate("/find-blood")}
      >
        Find Again
      </button>
    </div>
  );
};

export default Donors;

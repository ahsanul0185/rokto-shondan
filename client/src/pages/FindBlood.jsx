import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DonorContext } from '../contexts/DonorContext'

const FindBlood = () => {

  const navigate = useNavigate();

  const [donorType, setDonorType] = useState('')
  const [bloodGroup, setBloodGroup] = useState('')
  const [district, setDistrict] = useState('')
  const [upazilla, setUpazilla] = useState('')

  const [districts, setDistricts] = useState([]);
  const [upazillas, setUpazillas] = useState([]);


  const handleFormSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams({
      donorType: donorType || "blood",
      bloodGroup: bloodGroup || '',
      district : district || '',
      upazilla : upazilla || '',
    })
    
    navigate(`/donors?${params.toString()}`)
  }



    // Fetching all the districts
    const getAllDistricts = async () => {
      const data = await axios.get("https://bdapis.com/api/v1.2/districts");
      setDistricts(data.data.data);
    };
  
    const handleSelectDistrict = async (e) => {
      const selectedDistrict = e.target.value;
      const upazillaData = await axios.get(
        `https://bdapis.com/api/v1.2/district/${selectedDistrict}`
      );
      setDistrict(selectedDistrict);
      setUpazillas(upazillaData.data.data[0].upazillas);
  };
  

  useEffect(() => {
    getAllDistricts();
  }, []);

  return (
    <div className='section-padding mt-32'>
      <div className="bg-gradient-to-r from-primary to-[#b32446] py-7 px-6">
        <h1 className="text-2xl text-white font-bold">Find Blood</h1>
      </div>

      <form className="my-10 pl-1" onSubmit={handleFormSubmit}>

        {/* Donor Type */}
        <div className="flex items-center justify-between my-6 gap-4">
          <label
            htmlFor="donorType"
            className="w-20 md:w-48 font-medium flex justify-between"
          >
            Donor Type <span>:</span>{" "}
          </label>
          <select
            name="donorType"
            onChange={(e) => setDonorType(e.target.value)}
            value={donorType}
            className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-primary flex-grow"
            required
          >
            <option value="blood">Blood</option>
            <option value="platelet">Platelet</option>
          </select>
        </div>

        {/* Blood Group */}
        <div className="flex items-center justify-between my-6 gap-4">
          <label
            htmlFor="bloodGroup"
            className="w-20 md:w-48 font-medium flex justify-between"
          >
            Blood Group <span>:</span>{" "}
          </label>
          <select
            name="bloodGroup"
            onChange={(e) => setBloodGroup(e.target.value)}
            value={bloodGroup}
            className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-primary flex-grow"
            required
          >
            <option value="" disabled>
              Select Blood Group
            </option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        {/* District */}
        <div className="flex items-center justify-between my-6 gap-4">
          <label
            htmlFor="Email"
            className="w-20 md:w-48 font-medium flex justify-between"
          >
            District <span>:</span>{" "}
          </label>

          <select
            name="district"
            className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-primary flex-grow"
            onChange={(e) => { setDistrict(e.target.value); handleSelectDistrict(e) }}
            value={district}
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select District
            </option>
            {districts.map((district, idx) => (
              <option key={district.district} value={district.district}>
                {district.district}
              </option>
            ))}
          </select>
        </div>

        {/* Upazilla */}
        <div className="flex items-center justify-between my-6 gap-4">
          <label
            htmlFor="Email"
            className="w-20 md:w-48 font-medium flex justify-between"
          >
            Upazilla <span>:</span>{" "}
          </label>

          <select
            name="upazilla"
            className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-primary flex-grow"
            disabled={district ? false : true}
            onChange={(e) => setUpazilla(e.target.value)}
            value={upazilla}
            defaultValue="all"
          >
            <option value="all">
              All
            </option>
            {upazillas.map((upazilla, idx) => (
              <option key={upazilla} value={upazilla}>
                {upazilla}
              </option>
            ))}
          </select>
        </div>



        <div className="text-right">
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-primary to-[#b32446] rounded-md text-white font-semibold"
          >
            Find
          </button>
        </div>
      </form>
    </div>
  )
}

export default FindBlood
import { RiUserLine } from '@remixicon/react';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DonorContext } from '../contexts/DonorContext';

const DonorInfo = () => {

    const donorId = useParams();
    const [donor, setDonor] = useState({});
    const { backendURL } = useContext(DonorContext);


    const fetchDonarInfo = async () => {
        try {
            const response = await axios.get(`${backendURL}/api/donors/${donorId.id}`);
            setDonor(response.data.donor)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchDonarInfo();
    }, [])
    

  return (
      <div className='section-padding mt-28 pb-32'>
          
          <div className='md:w-3/4 bg-[#ffe3f2] px-8  py-12 mx-auto flex flex-col md:flex-row items-start gap-6 md:gap-16'>
              <div className='md:pl-12'>
                  
                  <div className=' ring-primary ring-4 rounded-full'>
                  <RiUserLine className='size-28 md:size-36 text-primary  pt-4 translate-y-0.5' />
                ``</div>
              </div>
              <div className='text-gray-950 text-xl flex flex-col gap-2'>
              <p className='font-semibold'>Name : { donor.fullName || donor.name }</p>
          <p><span className='font-semibold'>Donor Type :</span> { donor.donorType }</p>
          <p><span className='font-semibold'>Blood Group :</span> { donor.bloodGroup }</p>
          <p><span className='font-semibold'>Gender :</span> { donor.gender }</p>
          <p><span className='font-semibold'>Email :</span> { donor.email }</p>
          <p><span className='font-semibold'>Phone :</span> <span className='font-sans'>{ donor.phone }</span></p>
          <p><span className='font-semibold'>Address :</span> { donor.address }</p>
          <p><span className='font-semibold'>Upazilla :</span> { donor.upazilla }</p>
          <p><span className='font-semibold'>District :</span> { donor.district }</p>
              </div>
          </div>
    </div>
  )
}

export default DonorInfo
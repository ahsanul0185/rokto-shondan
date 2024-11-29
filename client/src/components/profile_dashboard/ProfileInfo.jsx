import React, { useContext } from 'react'
import { DonorContext } from '../../contexts/DonorContext'
import { RiUserLine } from '@remixicon/react';

const ProfileInfo = () => {
  
  const { profile } = useContext(DonorContext);

  return (
    <div className='rounded-md overflow-hidden -mt-14 md:mt-0'>
          
          <div className='bg-[#ffe3f2] px-6 sm:px-10 py-12 mx-auto flex flex-col xl:flex-row items-start gap-10 xl:gap-16'>
              <div className='xl:pl-20'>
                  
                  <div className=' ring-primary ring-4 rounded-full'>
                  <RiUserLine className='size-28 md:size-36  text-primary  pt-4 translate-y-0.5' />
                    </div>
              </div>
              <div className='text-gray-950 text-xl flex flex-col gap-2'>
              <p className='font-semibold'>Name : { profile.fullName || profile.name }</p>
          <p><span className='font-semibold'>Donor Type :</span> { profile.donorType }</p>
          <p><span className='font-semibold'>Blood Group :</span> { profile.bloodGroup }</p>
          <p><span className='font-semibold'>Gender :</span> { profile.gender }</p>
          <p><span className='font-semibold'>Email :</span> { profile.email }</p>
          <p><span className='font-semibold'>Phone :</span> <span className='font-sans'>{ profile.phone }</span></p>
          <p><span className='font-semibold'>Address :</span> { profile.address }</p>
          <p><span className='font-semibold'>Upazilla :</span> { profile.upazilla }</p>
          <p><span className='font-semibold'>District :</span> { profile.district }</p>
              </div>
          </div>
    </div>
  )
}

export default ProfileInfo
import React from 'react'
import successTick from '../assets/success-tick-2.gif'
import { Navigate, useNavigate } from 'react-router-dom';

const RegistrationSuccessModal = ({setShowSuccessModal}) => {

  const navigate = useNavigate()
  const handleLoginBtnClick = () => {
    setShowSuccessModal(false);
    navigate("/login")
  }

  return (
    <div className='fixed inset-0 bg-black/40 z-[999999]'>
      <div className='w-4/5 md:max-w-xl p-8 flex flex-col items-center rounded-md absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#ecebed] shadow-2xl'>

        <img className='w-56' src={successTick} alt="success" />
        
        <h2 className='text-xl md:text-2xl font-bold -mt-5 mb-5'>Registraion Successful</h2>
        <p className='text-sm md:text-base text-center'>You have successfully registered! Please log in to access your account.</p>

        <button
          type="submit"
          onClick={handleLoginBtnClick}
            className="px-4 py-2 mt-6 bg-gradient-to-r from-primary to-[#b32446] rounded-md text-white font-semibold"
          >
            Login
          </button>
          </div>
      </div>
  )
}

export default RegistrationSuccessModal
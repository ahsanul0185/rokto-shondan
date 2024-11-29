import { RiEyeCloseLine, RiEyeLine } from '@remixicon/react';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { DonorContext } from '../contexts/DonorContext';

const Login = () => {
  const navigate = useNavigate();
  const { backendURL, setAuthenticated } = useContext(DonorContext);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState({phone : "", password : "", other : ""});
  const [showPassword, setShowPassword] = useState(false);


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(backendURL+"/api/auth/login", { phone: "+88" + phoneNumber, password }, { withCredentials: true })
      setLoginError({});
      if (response.status === 200) {
        setAuthenticated(true);
        navigate("/profile");
      }
    
    } catch (error) {
      // console.log(error);
      if (error.status === 404) {
        setLoginError(prev => ({["phone"] : "User doesn't exist with the phone number."}))
      }
      else if (error.status === 401) {
        setLoginError(prev => ({["password"] : error.response.data.message}))
      } else {
        console.log(error)
      }
    }
  }
 

  return (
    <>
      <div className="md:mt-32 md:w-3/4 lg:w-1/2 mx-auto bg-gradient-to-r from-primary to-[#b32446] py-7 px-6">
        <h1 className="text-3xl md:text-2xl text-white font-bold">Login</h1>
      </div>
      <div className="section-padding mt-32 md:mt-12 lg:w-3/4">
        
      <form className="my-10 pl-1 sm:w-3/4 lg:max-w-sm mx-auto" onSubmit={handleFormSubmit}>

        {/* Phone  */}
        <div className="mt-6 mb-1 gap-4">
          <label
            htmlFor="Phone"
            className="mb-1 block"
          >
            Phone Number{" "}
          </label>
          <input
            type="number"
            placeholder="Entar your phone number"
            name="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value) || setLoginError({})}
            className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-primary w-full"
            required
          />
        </div>
        {loginError.phone && <span className='text-red-600'>{loginError.phone}</span>}
        {loginError.other && <span className='text-red-600'>{  loginError.other }</span>}

        {/* Passoword */}
        <div className="mt-6 mb-1">
          <label
            htmlFor="password"
            className="block mb-1"
          >
            Password 
          </label>
          <div className="relative flex-grow">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              name="password"
              value={password}
            onChange={(e) => setPassword(e.target.value) || setLoginError({})}
              className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-primary w-full"
              required
            />
            <div
              className="absolute right-5 text-gray-500 top-1/2 -translate-y-1/2 select-none cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
            </div>
          </div>
        </div>

        {loginError.password && <span className='text-red-600'>{  loginError.password }</span>}

        <div className="text-right mt-4">
          <button
            type="submit"
            className="px-4 py-2 w-full bg-gradient-to-r from-primary to-[#b32446] rounded-md text-white font-semibold"
          >
            Login
          </button>
        </div>
        <p className='mt-6 text-end'>Didn't have an account? <a href="/register" className='underline text-primary'>Register Now</a></p>
        </form>
        
      </div>
      </>
  )
}

export default Login
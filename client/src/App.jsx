import React, { useContext } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import FindBlood from './pages/FindBlood';
import Register from './pages/Register';
import Login from './pages/Login';
import Donors from './pages/Donors';
import { DonorContext } from './contexts/DonorContext';
import DonorInfo from './pages/DonorInfo';
import Profile from './pages/Profile';
import ChangePassword from './components/profile_dashboard/ChangePassword';
import ProfileInfo from './components/profile_dashboard/ProfileInfo';
import UpdateProfile from './components/profile_dashboard/UpdateProfile';
import MangeDonateDate from './components/profile_dashboard/MangeDonateDate';
import ProtectedRoute from './helper/ProtectedRoute';

const App = () => {

  const {authenticated } = useContext(DonorContext)

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about-us' element={<About />} />
        <Route path='/find-blood' element={<FindBlood />} />
        <Route path='/register' element={authenticated ? <Navigate to="/profile" /> : <Register />} />
        <Route path='/login' element={authenticated ? <Navigate to="/profile" /> : <Login />} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}>
          <Route path='' element={<ProfileInfo />} />
          <Route path='change-password' element={<ChangePassword />} />
          <Route path='manage-donate-date' element={<MangeDonateDate />} />
          <Route path='update-profile' element={<UpdateProfile />} />
        </Route>
        <Route path={`/donors`} element={<Donors />} />
        <Route path={`/donor/:id`} element={<DonorInfo />} />
      </Routes>
    </div>
  )
}

export default App
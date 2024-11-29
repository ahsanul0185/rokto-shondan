import { useContext } from 'react'
import { DonorContext } from '../contexts/DonorContext'
import { Navigate } from 'react-router-dom';
import { getCookie } from './getCookie';

const ProtectedRoute = ({ children }) => {
  const  authenticated  = getCookie('accessToken');

  if (!authenticated) {
    return <Navigate to="/login" replace />
  }
  
  return children
  
}

export default ProtectedRoute
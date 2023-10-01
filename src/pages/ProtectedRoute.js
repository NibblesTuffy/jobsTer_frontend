import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
  const { user } = useSelector((store) => store.user)
  // console.log(user)
  if (user) {
    // console.log(`user ... ${user}`);
    return children
  }
  return <Navigate to="/landing" />
}

export default ProtectedRoute
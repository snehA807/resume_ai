import { useAuth } from "../hooks/auth";
import {Navigate, useNavigate} from "react-router"
import React from "react";
const Protected=()=>{
  const {user, loading}=useAuth()
  const navigate=useNavigate()
const Protected = ()=>{
  const { loading,user}=useAuth()
   if (loading) {
  return (
    <main>
      <div className="loader"></div>
    </main>
  );
}
  if(!user){
    return <Navigate to="/login"/>
    return null
  }
 return children
}
}
export default Protected
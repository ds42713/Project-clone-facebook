import { Navigate, Route, Routes } from 'react-router-dom';
import React, { useContext } from 'react'
import Login from '../pages/Login'
import Register from '../pages/Register'
import PublicLayOut from '../components/layouts/PublicLayOut'
import Home from '../pages/Home'
import Friend from '../pages/Friend'
import MainLayout from '../components/layouts/MainLayout'
import { AuthContext } from '../contexts/AuthContext'

export default function RouteConfig() {

  const { user } = useContext(AuthContext);

  return (
    <Routes>
      { user ? (			
	  		
			<Route path='/' element={<MainLayout/>} >
				<Route path='' element={<Home/>} />
				<Route path='friend' element={<Friend/>} />
				<Route path="*" element={<Navigate to="/" />} />
			</Route>
		) : (
			<Route path='/' element={<PublicLayOut/>} >
				<Route path='' element={<Login/>} />
				<Route path='register' element={<Register/>} />
				<Route path="*" element={<Navigate to="/" />} />
			</Route>
		)}
    </Routes>
  )
}

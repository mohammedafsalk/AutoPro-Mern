import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/serviceCenter/Home'
import Login from '../components/serviceCenter/Login'
import Signup from '../components/serviceCenter/Signup'

export default function ServiceCenterRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
    </Routes>
  )
}

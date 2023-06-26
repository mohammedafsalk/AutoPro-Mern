import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Login from '../components/user/signup'
import SignUp from '../components/user/signup'

export default function UserRoutes() {
  return (
   <Routes>
    <Route path='/login' element={<Login/>} />
    <Route path='/signup' element={<SignUp/>} />
   </Routes>
  )
}

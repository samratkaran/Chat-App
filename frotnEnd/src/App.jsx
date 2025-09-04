import React from 'react'
import Login from '../Components/Login'
import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'
import Register from '../Components/Register'
import Home from './Home/Home'
import ResetPassword from '../Components/ResetPassword'
import { VerifyUser } from '../utils/VerifyUser'

function App() {
  return (
    <div className='bg-gray-400 w-[100%] h-[100vh]' >
    <Routes>
      
      <Route path='/login' element={<Login/>} ></Route>
      <Route path='/reset' element={<ResetPassword/>} ></Route>
      <Route path='/Register' element={<Register/>} ></Route>
      <Route element={<VerifyUser/>}>
        <Route path='/' element={<Home/>} ></Route>
      </Route>
    </Routes>
    <ToastContainer/>
   
      
    </div>  
  )
}

export default App

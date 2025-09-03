import React from 'react'
import Login from '../Components/Login'
import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'
import Register from '../Components/Register'
import Home from './Home/Home'

function App() {
  return (
    <div className='bg-gray-400 w-[100%] h-[100vh]' >
    <Routes>
      <Route path='/' element={<Home/>} ></Route>
      <Route path='/login' element={<Login/>} ></Route>
      <Route path='/Register' element={<Register/>} ></Route>
    </Routes>
    <ToastContainer/>
   
      
    </div>  
  )
}

export default App

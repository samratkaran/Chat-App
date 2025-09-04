import React from 'react'
import { FaSearch } from "react-icons/fa";
import { useAuth } from '../src/context/AuthContext';

const Sidebar = () => {
    const {authUser} = useAuth()
  return (
    <div className='w-[30%] h-[100vh] flex flex-col  items-start flex-wrap pt-5 bg-gray-200 ps-4'>
 <div className='flex justify-center items-center w-full gap-3   '>
     <div className='w-[75%] '>
    <label className="input border border-rounded-full border-gray-400 flex items-center gap-2 ps-3 pe-3  bg-white">
  
  
  <input type="search" className="grow" placeholder="Search" />
  <FaSearch className='text-xl cursor-pointer' />
  
</label>
  </div>
  <div className='w-[14%]  flex flex-col gap-3 border-2 border rounded-full cursor-pointer '>
  <img src={authUser.user.profilepic} alt={authUser.user.username} />

  </div>
 </div>
    </div>
  )
}

export default Sidebar



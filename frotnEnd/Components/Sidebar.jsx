import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../src/context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { authUser } = useAuth();
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState('')
  const [searchUser, setSearchUser] = useState([])
  const [loading, setLoading] = useState(false)


  const handelSearchSubmit = async(e)=>{
    e.preventDefault()
    setLoading(true)
    try {
        const search  = await axios.get(`/api/user/search?search=${searchInput}`)
        const data =    search.data
        if(data.success === false){
            setLoading(false);
            console.log(data.message)
        }
        setLoading(false)
        if(data.loading === 0){
            toast.info('User Not Found')
        }else{
            setSearchUser(data)
        }
    } catch (error) {
        console.log(error)
    }
  }
  console.log(searchUser)
  return (
    <div className="w-[30%] h-[100vh] flex flex-col  items-start flex-wrap pt-5 bg-gray-200 ps-4">
      <div className="flex justify-between items-center w-full pe-4 mb-5 ">
        <h1 className="font-bold text-[1.5rem] text-green-500">PrivChat</h1>
        <div>
          <p className="text-[1.1rem]">
            <span className="text-green-700 text-[1.2rem] font-bold">Welcome</span>{" "}
            {authUser.user.username}
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center w-full gap-3   ">
        <form onSubmit={handelSearchSubmit} className="flex  items-center bg-white rounded-full w-auto p-1">
          <input
          value={searchInput}
          onChange={(e)=>setSearchInput(e.target.value)}
            type="search"
            className="w-auto px-4 rounded-full border-gray-400 bg-white"
            placeholder="Search"
          />

          <button>
            <FaSearch className="cursor-pointer p-2 text-4xl rounded-full hover:bg-green-600 font-sm " />
          </button>
        </form>
        <div className="w-[14%]  flex flex-col gap-3 border-2  rounded-full cursor-pointer ">
          <img onClick={()=>navigate(`/profile/${authUser.user._id}`)} src={authUser.user.profilepic} alt={authUser.user.username} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

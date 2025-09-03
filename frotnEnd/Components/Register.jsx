import React from "react";
import Login from "./Login";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../src/context/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const {setAuthUser} = useAuth()
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({});

  const selectGender = (e)=>{
    setInput((prev)=>({
        ...prev , gender:e === input.gender ? '' : e
    }))

  }

 const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(input.password !== input.confpassword){
        setLoading(false)
        return toast.error('password Does not Match')
    }
    try {
      const register = await axios.post("/api/auth/register", input);
      const data = register.data;
      if (data.success === false) {
        setLoading(false);
        toast.error(data.message)
        console.log(data.message);
      }
      toast.success('User Register successully');
      localStorage.setItem("chatApp", JSON.stringify(data));
      setAuthUser(data)
      setLoading(false);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        toast.error(
          error?.response?.data?.message || "Please Enter Details Correctly ❌",
          {}
        );
      }

      setLoading(false);
      console.log("error in Login page", error);
    }
  };
  const handelInput = (e) => {
        setInput({
            ...input , [e.target.id]:e.target.value
        })
  };
  console.log(input)
  return (
    <div className="flex flex-col justify-center text-center items-center mix-w-full mx-auto w-[100%] h-[100vh]">
      <div className=" p-6 gap-12 rounded-lg  bg-clip-padding  border-1 shadow-2xl bg-gray-500  ">
        {" "}
        <h1 className="text-3xl font-bold text-gray-800 pb-8">Register</h1>
        <form
          onSubmit={handelSubmit}
          className="flex flex-col gap-4 justify-content-center items-center w-80 text-black font-medium"
        >
          <input
            type="text"
            onChange={handelInput}
            placeholder="fullname"
            id="fullname"
            className="input"
            required
          />
          <input
            type="text"
            onChange={handelInput}
            placeholder="username"
            id="username"
            className="input"
            required
          />
          <input
            type="email"
            onChange={handelInput}
            placeholder="email"
            id="email"
            className="input"
            required
          />
          <input
            type="date"
            onChange={handelInput}
            placeholder="Date of Birth"
            id="dob"
            className="input"
            required
          />
        

          {/* 🔑 Password with toggle */}

         

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              onChange={handelInput}
              placeholder="Password"
              id="password"
              className="input w-full pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
           <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              onChange={handelInput}
              placeholder="Confirm Password"
              id="confpassword"
              className="input w-full pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div id="gender" className="flex flex-start gap-8 w-full">
            <label htmlFor="" className="flex gap-2">
              <input
              onChange={()=>selectGender('male')}
              checked={input.gender==='male'}
                type="checkbox"
                className="checkbox checkbox-primary"
              />
              <span>Male</span>
            </label>
            <label htmlFor="" className="flex gap-2">
              <input
                 onChange={()=>selectGender('female')}
              checked={input.gender==='female'}
                type="checkbox"
                className="checkbox checkbox-primary"
              />
              <span>Female</span>
            </label>
            <label htmlFor="" className="flex gap-2">
              <input
                 onChange={()=>selectGender('other')}
              checked={input.gender==='other'}
                type="checkbox"
                className="checkbox checkbox-primary"
              />
              <span>Other</span>
            </label>
          </div>
          <button className="btn btn-success" type="submit">
            {loading ? "loading..." : "Register"}
          </button>
        </form>
        <div>
          <p className="text-white pt-4">
            Alreday Have An Account ? 
            <Link to={"/login"}>
              <span className="underline hover:text-green-300"> Login</span>
            </Link>
          </p>
        </div>
     
      </div>
    </div>
  );
};

export default Register;

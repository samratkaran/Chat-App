import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../src/context/AuthContext";

function ResetPassword() {
  const navigate = useNavigate();
  const { setAuthUser} = useAuth()
  const [input, setInput] = useState({});
  const [loading, setLoading] = useState(false);


  const handelInput = (e) => {
    setInput({
      ...input,
      [e.target.id]: e.target.value,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const login = await axios.post("/api/auth/reset", input);
      const data = login.data;
      if (data.success === false) {
        setLoading(false);
        console.log(data.message);
      }
      toast.success(data.message);
      localStorage.setItem("chatApp", JSON.stringify(data));
      setAuthUser(data)
      setLoading(false);
      navigate("/");
    } catch (error) {
      if (error.response) {
        toast.error(
          error?.response?.data?.message || "Invalid username or password ❌",
          {}
        );
      }

      setLoading(false);
      console.log("error in Login page", error);
    }
  };
  return (
    <div className="flex flex-col justify-center text-center items-center mix-w-full mx-auto w-[100%] h-[100vh]">
      <div className=" p-6 gap-12 rounded-lg  bg-clip-padding  border-1 shadow-2xl bg-gray-500  ">
        {" "}
        <h1 className="text-3xl font-bold text-gray-800 pb-8">Reset Your Password</h1>
        <form
          onSubmit={handelSubmit}
          className="flex flex-col gap-4 justify-content-center items-center w-80 text-black font-medium"
        >
          <input
            type="email"
            onChange={handelInput}
            placeholder="Enter Your Email"
            id="email"
            className="input "
            required
          />
          <input
            type="number"
            onChange={handelInput}
            placeholder="Enter OTP"
            id="email"
            className="input "
            required
          />
          {/* 🔑 Password with toggle */}

          
         
          <button className="btn btn-success" type="submit">
            {loading ? "loading..." : "Reset Password"}
          </button>
        </form>
       
       
      </div>
    </div>
  );
}

export default ResetPassword;

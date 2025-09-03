import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../src/context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { setAuthUser} = useAuth()
  const [input, setInput] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      const login = await axios.post("/api/auth/login", input);
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
        <h1 className="text-3xl font-bold text-gray-800 pb-8">Login</h1>
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
          <button className="btn btn-success" type="submit">
            {loading ? "loading..." : "Login"}
          </button>
        </form>
        <div>
          <p className="text-white pt-4">
            Don't Have An Account{" "}
            <Link to={'/register'}>
              <span className="underline hover:text-green-300">Register</span>
            </Link>
          </p>
        </div>
        <div>
          <p className="text-white pt-2">
            Don't Remember Your password ?{" "}
            <Link to={'/login'}>
              <span className="underline hover:text-red-300">Forget Now</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

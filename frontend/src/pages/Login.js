import React, { useState } from "react";
import LoginIcon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-2     py-5 w-full max-w-md mx-auto rounded">
          <div className="w-20 h-20 mx-auto">
            <img src={LoginIcon} alt="loginIcon" />
          </div>

          <form>
            <div className="grid">
              <label>Email :</label>
              <div className="p-2 bg-slate-100">
                <input
                  type="email"
                  placeholder="enter email"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="grid">
              <label>Password :</label>
              <div className="p-2 flex bg-slate-100">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <IoEyeOff /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <Link
              to={"/forgot-password"}
              className="block w-fit ml-auto hover:underline hover:text-red-600"
            >
              {" "}
              forgot Password{" "}
            </Link>
            <button className="bg-red-600 px-6 text-white py-2 rounded-full w-full max-w-[150px] hover:scale-110 hover:transition-all mx-auto block mt-5 ">
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;

import React, { useState } from "react";
import { HiMail, HiLockClosed, HiEye, HiEyeOff } from "react-icons/hi";
import loginImage from "../../assets/login-image.png";
import loginImageJson from "../../assets/Book loading.json";
import Lottie from "lottie-react";
import SocialLogin from "../../components/SocialLogin";
import { Link, useNavigate } from "react-router";
import { HeadProvider } from "react-head";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signInUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInUser(email, password);
      Swal.fire({
        icon: "success",
        title: "Login Successful 🎉",
        text: `Welcome back, ${result.user.displayName || "User"}!`,
      });
      navigate("/"); 
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#218fb111] flex">
      <HeadProvider>
        <title>EduTrack | Login</title>
        <meta name="description" content="Welcome to Login page" />
      </HeadProvider>

      {/* Left Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-12 lg:px-20">
        <div className="max-w-md mx-auto w-full">
          {/* Back Home Link */}
          <div className="mb-12">
            <Link to={"/"} className="text-gray-600 hover:text-gray-800 text-sm">
              ← Back Home
            </Link>
          </div>

          <div className="relative z-10 mb-10">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src="/public/logo.png"
                alt="EduTrack Logo"
                className="w-12 h-12 object-contain"
              />
              <span className="text-4xl font-semibold text-teal-950">EduTrack</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 tracking-wider animate-pulse-slow">
              Embark on Your Journey
            </h1>
            <p className="text-gray-700 text-md leading-relaxed max-w-md animate-fade-in-up">
              Your ultimate Student Life Toolkit. Track classes, manage budget,
              plan studies, and ace your exams—all in one place!
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <HiMail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-14 pr-5 py-3 border border-gray-400 rounded-full focus:outline-none focus:ring-1 focus:ring-teal-500
                 focus:border-teal-500"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <HiLockClosed className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-14 py-3 border border-gray-400 rounded-full text-black focus:outline-none focus:ring-1 
                focus:ring-teal-500 focus:border-teal-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-5 flex items-center"
              >
                {showPassword ? (
                  <HiEyeOff className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                ) : (
                  <HiEye className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                )}
              </button>
            </div>

            {/* Forget Password */}
            <div className="text-right">
              <button className="text-gray-600 hover:text-gray-800 text-sm">
                Forgot your password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-full transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Login
            </button>

            <SocialLogin />

            <div>
              <p className="text-center text-gray-600 text-sm">
                Don't have an account?{" "}
                <Link
                  to={"/register"}
                  className="text-teal-600 hover:text-teal-800 font-semibold"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex lg:flex-1 items-center justify-center relative overflow-hidden">
        <div className="bg-gradient-to-br from-teal-500 to-teal-700 w-1/2 h-11/12 rounded-b-full -mt-32"></div>
        <img
          src={loginImage}
          alt="Login Illustration"
          className="h-auto object-contain absolute -ml-32 w-3/4"
        />
        <Lottie
          animationData={loginImageJson}
          loop={true}
          className="w-32 h-32 absolute right-40 mt-32"
        />
      </div>
    </div>
  );
};

export default Login;

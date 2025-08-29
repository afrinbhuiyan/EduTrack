import React, { useState } from "react";
import { HiMail, HiLockClosed, HiEye, HiEyeOff, HiUser } from "react-icons/hi";
import loginImage from "../../assets/login-image.png";
import loginImageJson from "../../assets/Book loading.json";
import Lottie from "lottie-react";
import SocialLogin from "../../components/SocialLogin";
import { Link } from "react-router";
import { HeadProvider } from "react-head";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
      });
      return;
    }
    console.log("Form Data:", data);

    try {
      // create user with email & password
      const result = await createUser(data.email, data.password);

      // update profile with name & photo
      await updateUserProfile({
        displayName: data.name,
        photoURL:
          "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg",
      });

      Swal.fire({
        icon: "success",
        title: "Registration Successful 🎉",
        text: `Welcome, ${data.name}!`,
      });
      navigate("/");

      console.log("User created:", result.user);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#218fb111] flex">
      <HeadProvider>
        <title>EduTrack | Register</title>
        <meta name="description" content="Welcome to Register page" />
      </HeadProvider>

      {/* Left Side - Register Form */}
      <div className="flex-1 flex flex-col justify-center px-12 lg:px-20">
        <div className="max-w-md mx-auto w-full">
          {/* Back Home Link */}
          <div className="mb-12">
            <Link
              to={"/"}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
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
              <span className="text-4xl font-semibold text-teal-950">
                EduTrack
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 tracking-wider animate-pulse-slow">
              Join the EduTrack Community
            </h1>
            <p className="text-gray-700 text-md leading-relaxed max-w-md animate-fade-in-up">
              Create your free account and unlock your ultimate Student Life
              Toolkit—track classes, manage budget, plan studies, and ace exams!
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <HiUser className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Your Name"
                {...register("name", { required: "Name is required" })}
                className="w-full pl-14 pr-5 py-3 border border-gray-400 rounded-full focus:outline-none focus:ring-1 focus:ring-teal-500
                     focus:border-teal-500"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <HiMail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                placeholder="Your Email"
                {...register("email", { required: "Email is required" })}
                className="w-full pl-14 pr-5 py-3 border border-gray-400 rounded-full focus:outline-none focus:ring-1 focus:ring-teal-500
                     focus:border-teal-500"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <HiLockClosed className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/,
                    message:
                      "Password must include uppercase, lowercase, number & special character",
                  },
                })}
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
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            {/* Confirm Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <HiLockClosed className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Please confirm password",
                })}
                className="w-full pl-14 pr-14 py-3 border border-gray-400 rounded-full text-black focus:outline-none focus:ring-1 
                    focus:ring-teal-500 focus:border-teal-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-5 flex items-center"
              >
                {showConfirmPassword ? (
                  <HiEyeOff className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                ) : (
                  <HiEye className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-full transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Register
            </button>
            <SocialLogin />

            <div>
              <p className="text-center text-gray-600 text-sm">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="text-teal-600 hover:text-teal-800 font-semibold"
                >
                  Login
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
          alt="Register Illustration"
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

export default Register;

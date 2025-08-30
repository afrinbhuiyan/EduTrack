import React, { useContext } from "react";
import FaGoogle from "../assets/icons8-google-48.png";
import FaGitHub from "../assets/icons8-github-48.png";
import FaFaceBook from "../assets/icons8-facebook-48.png";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const SocialLogin = () => {
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate("/"); // login successful, redirect home
    } catch (error) {
      console.error("Google login failed:", error.message);
      alert(error.message);
    }
  };

  // Note: GitHub and Facebook login can also be implemented similarly
  // if you add their providers in AuthProvider.
  const handleGitHubLogin = () => {
    alert("GitHub login not implemented yet!");
  };

  const handleFacebookLogin = () => {
    alert("Facebook login not implemented yet!");
  };

  return (
    <>
      <p className="text-center text-gray-600 font-outfit text-sm pt-4">
        Or Login With
      </p>
      <div className="flex justify-center space-x-4 pt-2">
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <img src={FaGoogle} alt="Login with Google" className="w-8 h-8" />
        </button>
        <button
          type="button"
          onClick={handleGitHubLogin}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <img src={FaGitHub} alt="Login with GitHub" className="w-8 h-8" />
        </button>
        <button
          type="button"
          onClick={handleFacebookLogin}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <img
            src={FaFaceBook}
            alt="Login with Facebook"
            className="w-8 h-8"
          />
        </button>
      </div>
    </>
  );
};

export default SocialLogin;

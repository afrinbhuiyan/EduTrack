import React from 'react';
import  FaGoogle  from '../assets/icons8-google-48.png';
import  FaGitHub  from '../assets/icons8-github-48.png';
import  FaFaceBook  from '../assets/icons8-facebook-48.png';

const SocialLogin = () => {
  return (
    <>
      <p className="text-center text-gray-600 font-outfit text-sm pt-4">Or Login With</p>
      <div className="flex justify-center space-x-4 pt-2">
        <button>
          <img src={FaGoogle} alt="" />
        </button>
        <button>
          <img src={FaGitHub} alt="" />
        </button>
        <button>
          <img src={FaFaceBook} alt="" />
        </button>
      </div>
    </>
  );
};

export default SocialLogin;
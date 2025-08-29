import React from "react";
import Lottie from "lottie-react"; 
import loadingAnimation from "../assets/loading.json";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        className="w-24 h-24"
      />
    </div>
  );
};

export default Spinner;

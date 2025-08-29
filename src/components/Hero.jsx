import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";

const Hero = () => {
  // Animation variants for the heading (Letter-by-Letter Reveal)
  const headingContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Stagger each letter
      },
    },
  };

  const headingLetterVariants = {
    hidden: {
      opacity: 0,
      x: -20,
      rotate: 10,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Animation variants for the subheading
  const subheadingVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, delay: 0.3, ease: "easeOut" },
    },
  };

  // Animation for image
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.8, delay: 0.7, ease: "easeOut" },
    },
  };

  // Split text into individual letters
  const headingText = "Welcome to EduTrack 🎓".split("");

  return (
    <div className="">
      <section className="bg-[#7ea6b3] text-white min-h-[90vh] flex flex-col justify-center px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-7xl mx-auto">
          {/* Text Content */}
          <div className="flex-1">
            {/* Main Heading with Letter-by-Letter Animation */}
            <motion.h1
              className="text-4xl md:text-[55px] font-bold mb-6 roboto bg-clip-text text-transparent bg-white relative text-shadow-glow"
              variants={headingContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {headingText.map((letter, index) => (
                <motion.span
                  key={index}
                  variants={headingLetterVariants}
                  style={{
                    display: "inline-block",
                    whiteSpace: letter === " " ? "pre" : "normal",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subheading with Enhanced Animation */}
            <motion.p
              className="text-lg md:text-2xl mb-8 max-w-lg font-['Inter']"
              variants={subheadingVariants}
              initial="hidden"
              animate="visible"
            >
              Your ultimate Student Life Toolkit. Track classes, manage budget,
              plan studies, and ace your exams—all in one place!
            </motion.p>

            {/* Call to Action Buttons in Row */}
            <div className="flex flex-row gap-4">
              {/* First Button */}
              <Link to="/schedule">
                <button className="group relative h-14 overflow-hidden overflow-x-hidden rounded-full bg-white px-14 py-2 text-teal-800">
                  <span className="relative z-10">Start Tracking</span>
                  <span className="absolute inset-0 overflow-hidden rounded-md">
                    <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-[#0000001f] transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
                  </span>
                </button>
              </Link>

              {/* Second Button */}
              <Link
                to={"/study"}
                className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-[#7ea6b3] transition duration-300 ease-out border-2 border-white rounded-full shadow-md group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full duration-300 -translate-x-full bg-white group-hover:translate-x-0 ease">
                  <FaArrowRightLong />
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                  Plan Your Studies
                </span>
                <span className="relative invisible">Plan Your Studies</span>
              </Link>
            </div>
          </div>

          <motion.img
            src="/bg.png"
            alt="Student Life Illustration"
            className="w-full max-w-lg flex-1"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          />
        </div>
      </section>
    </div>
  );
};

export default Hero;

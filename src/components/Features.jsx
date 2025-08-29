import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Lottie from "lottie-react"; // ✅ Lottie import
import trackerJson from "../assets/Booking Calender.json";
import budgetJson from "../assets/finance.json";
import examJson from "../assets/exams.json";
import plannerJson from "../assets/Time management.json";

const Features = () => {
  const [activeCard, setActiveCard] = useState(null);

  // Animation variants for cards
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.8,
      rotateX: 45,
      filter: "blur(10px)",
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        damping: 15,
      },
    }),
  };

  const features = [
    {
      id: 1,
      animation: trackerJson, // ✅ Lottie file
      title: "Class Schedule Tracker",
      description:
        "Never miss a class again! Organize your routine and track everything with ease.",
      link: "/schedule",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      titleColor: "text-blue-600",
      iconBg: "bg-blue-100",
      arrow: "text-blue-500",
    },
    {
      id: 2,
      animation: budgetJson,
      title: "Budget Tracker",
      description:
        "Keep your pocket money under control! Track expenses and manage your budget effortlessly.",
      link: "/budget",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      titleColor: "text-red-600",
      iconBg: "bg-red-100",
      arrow: "text-red-500",
    },
    {
      id: 3,
      animation: examJson,
      title: "Exam Q&A Generator",
      description:
        "No more last-minute stress! Auto-generate Q&A sets to prepare smartly for exams.",
      link: "/exam",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      titleColor: "text-green-600",
      iconBg: "bg-green-100",
      arrow: "text-green-500",
    },
    {
      id: 4,
      animation: plannerJson,
      title: "Study Planner",
      description:
        "Break big goals into small tasks and stay on track. Study smarter, not harder.",
      link: "/study",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      titleColor: "text-purple-600",
      iconBg: "bg-purple-100",
      arrow: "text-purple-500",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Features Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link key={feature.id} to={feature.link} className="block group">
                <motion.div
                  className={`relative h-80 ${feature.bgColor} border-2 ${feature.borderColor} rounded-2xl p-6 text-center transform-gpu transition-all duration-300 overflow-hidden`}
                  variants={cardVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  onMouseEnter={() => setActiveCard(feature.id)}
                  onMouseLeave={() => setActiveCard(null)}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Hover glow effect */}
                  <div
                    className={`absolute inset-0 ${feature.iconBg} opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-2xl`}
                  />

                  {/* ✅ Lottie Animation instead of emoji */}
                  <div className="flex justify-center items-center mb-4 relative z-10">
                    <Lottie
                      animationData={feature.animation}
                      loop={true}
                      className="w-24 h-24"
                    />
                  </div>

                  {/* Title */}
                  <motion.h3
                    className={`text-xl font-semibold mb-4 ${feature.titleColor} relative z-10 transition-colors duration-300`}
                    animate={
                      activeCard === feature.id
                        ? { scale: [1, 1.05, 1] }
                        : {}
                    }
                    transition={{ duration: 0.4 }}
                  >
                    {feature.title}
                  </motion.h3>

                  {/* Description */}
                  <p className="text-gray-600 relative z-10 text-sm leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Interactive arrow */}
                  <motion.div
                    className={`absolute bottom-4 right-4 ${feature.arrow} opacity-0 group-hover:opacity-100 transition-all duration-300 text-xl`}
                    animate={
                      activeCard === feature.id
                        ? { x: [0, 3, 0], scale: [1, 1.2, 1] }
                        : {}
                    }
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    ↗
                    <motion.div
                      className={`absolute inset-0 ${feature.arrow} opacity-30`}
                      animate={
                        activeCard === feature.id
                          ? { x: [-5, 0], opacity: [0.3, 0] }
                          : {}
                      }
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      ↗
                    </motion.div>
                  </motion.div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;

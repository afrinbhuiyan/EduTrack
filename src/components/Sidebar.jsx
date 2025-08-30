import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  FiHome,
  FiSettings,
  FiUser,
  FiChevronLeft,
  FiCalendar,
  FiDollarSign,
  FiEdit,
  FiBookOpen,
  FiLogOut,
} from "react-icons/fi";
import { NavLink, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

export default function UniqueSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [width, setWidth] = useState(260);
  const [isResizing, setIsResizing] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  // Handle mouse move for resizing
  const handleMouseMove = useCallback(
    (e) => {
      if (isResizing) {
        const newWidth = e.clientX;
        if (newWidth > 180 && newWidth < 400) {
          setWidth(newWidth);
        }
      }
    },
    [isResizing]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const navItems = [
    { icon: <FiHome />, label: "Home", to: "/" },
    { icon: <FiUser />, label: "Profile", to: "/profile" },
    { icon: <FiSettings />, label: "Settings", to: "/settings" },
    { icon: <FiCalendar />, label: "Schedule", to: "/dashboard/schedule" },
    { icon: <FiDollarSign />, label: "Budget", to: "/dashboard/budget" },
    { icon: <FiEdit />, label: "Exam Planner", to: "/dashboard/exam" },
    { icon: <FiBookOpen />, label: "Study Tracker", to: "/dashboard/study" },
    { icon: <FiLogOut />, label: "Logout", to: "/logout" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <motion.div
      animate={{ width: isCollapsed ? 72 : width }}
      className="relative h-screen flex flex-col 
    bg-gradient-to-b from-teal-600/90 to-teal-800/90 
    backdrop-blur-xl border-r border-teal-400/40 shadow-xl transition-all w-[72px]"
    >
      {/* Collapse Button */}

      <button
        aria-label="Toggle sidebar"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-teal-500 text-white 
      p-1 rounded-full shadow-md hover:scale-110 transition"
      >
        <FiChevronLeft
          className={`transition-transform ${isCollapsed ? "rotate-180" : ""}`}
        />
      </button>

      {/* Sidebar Content */}
      <div className="flex-1 mt-10 space-y-2 px-4">
        {navItems.map((item, i) => {
          // Logout handled separately
          if (item.label === "Logout") {
            return (
              <button
                key={i}
                onClick={handleLogout}
                className="flex items-center gap-3 p-2 rounded-sm cursor-pointer text-white hover:bg-teal-500/40 w-full"
              >
                <span className="text-xl shrink-0">{item.icon}</span>
                {!isCollapsed && (
                  <span
                    className="truncate block"
                    style={{ maxWidth: width - 80 }}
                  >
                    {item.label}
                  </span>
                )}
              </button>
            );
          }

          // Other nav items
          return (
            <NavLink
              key={i}
              to={item.to || "#"}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-sm cursor-pointer transition relative group text-white w-full ${
                  isActive
                    ? "bg-teal-500/50 font-bold shadow-[0_0_8px_rgba(250,204,21,0.7)]"
                    : "hover:bg-teal-500/40"
                }`
              }
            >
              <span className="text-xl shrink-0">{item.icon}</span>
              {!isCollapsed && (
                <span
                  className="truncate block"
                  style={{ maxWidth: width - 80 }}
                >
                  {item.label}
                </span>
              )}

              {/* Tooltip for collapsed mode */}
              {isCollapsed && (
                <span className="absolute left-full ml-2 px-2 py-1 rounded-md bg-black/70 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {item.label}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Resize Handle */}
      {!isCollapsed && (
        <div
          onMouseDown={() => setIsResizing(true)}
          className="absolute right-0 top-0 w-1 h-full cursor-ew-resize 
        bg-teal-400/20 hover:bg-teal-400/40 transition"
        />
      )}
    </motion.div>
  );
}

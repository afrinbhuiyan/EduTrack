import React, { useContext, useState, useRef, useEffect } from "react";
import { FiBell, FiUser, FiSettings, FiLogOut, FiHelpCircle, FiMenu, FiSearch, FiMoon, FiSun } from "react-icons/fi";
import { AuthContext } from "../contexts/AuthContext";

const Header = ({ onMenuToggle }) => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);

  // Sample notifications data
  const notifications = [
    { id: 1, text: "Your report is ready to download", time: "10 mins ago", read: false },
    { id: 2, text: "New message from Sarah", time: "2 hours ago", read: false },
    { id: 3, text: "System update completed", time: "Yesterday", read: true },
  ];

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div className="w-full flex items-center justify-between bg-[#001e36] px-6 h-14 sticky top-0 z-50 border-b border-gray-800">
      {/* Left: Menu toggle and title */}
      <div className="flex items-center">
        <button 
          onClick={onMenuToggle}
          className="p-2 rounded-md hover:bg-gray-800 mr-2 text-gray-300 lg:hidden"
        >
          <FiMenu className="text-xl" />
        </button>
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-white outfit">
          EduTrack
        </h1>
      </div>

      {/* Center: Search bar */}
      <div className="hidden md:flex items-center mx-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-gray-200"
          />
        </div>
      </div>

      {/* Right: Notifications & Avatar */}
      <div className="flex items-center gap-4">
        {/* Dark mode toggle */}
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-800 transition text-gray-300"
        >
          {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
        </button>

        {/* Help button */}
        <button className="p-2 rounded-full hover:bg-gray-800 transition text-gray-300">
          <FiHelpCircle className="text-xl" />
        </button>

        {/* Notification button */}
        <div className="relative" ref={notificationsRef}>
          <button 
            className="p-2 rounded-full hover:bg-gray-800 transition relative text-gray-300"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          >
            <FiBell className="text-xl" />
            {unreadNotifications > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                {unreadNotifications}
              </span>
            )}
          </button>

          {/* Notifications dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-gray-800 shadow-xl rounded-md py-2 border border-gray-700 animate-fadeIn z-50">
              <div className="px-4 py-2 border-b border-gray-700">
                <h3 className="font-medium text-gray-200">Notifications</h3>
                <p className="text-xs text-gray-400">{unreadNotifications} unread</p>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`px-4 py-3 border-b border-gray-700 last:border-0 hover:bg-gray-750 cursor-pointer ${notification.read ? 'opacity-70' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <p className="text-sm text-gray-200">{notification.text}</p>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 ml-2"></span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-gray-700">
                <button className="text-sm text-cyan-400 hover:text-cyan-300 font-medium w-full text-center">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Avatar & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-800 p-1 pl-2 rounded-md transition group"
            onClick={() => setOpen(!open)}
          >
            <div className="flex flex-col items-end mr-1">
              <span className="font-medium text-gray-200 text-sm">
                {user?.displayName || "Guest"}
              </span>
              <span className="text-xs text-gray-400">Premium Account</span>
            </div>
            <div className="relative">
              <img
                src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="avatar"
                className="w-9 h-9 rounded-full border-2 border-transparent group-hover:border-teal-500 transition-all"
              />
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
            </div>
          </div>

          {/* Dropdown menu */}
          {open && (
            <div className="absolute right-0 mt-2 w-56 bg-gray-800 shadow-xl rounded-md py-2 border border-gray-700 animate-fadeIn z-50">
              <div className="px-4 py-2 border-b border-gray-700">
                <p className="text-sm font-medium text-gray-200">{user?.displayName || "Guest"}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email || "No email"}</p>
              </div>
              <button className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-750 w-full text-left transition">
                <div className="mr-3 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <FiUser className="text-gray-300" />
                </div>
                <div>
                  <div>Profile</div>
                  <div className="text-xs text-gray-400">View your profile</div>
                </div>
              </button>
              <button className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-750 w-full text-left transition">
                <div className="mr-3 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <FiSettings className="text-gray-300" />
                </div>
                <div>
                  <div>Settings</div>
                  <div className="text-xs text-gray-400">Customize settings</div>
                </div>
              </button>
              <button
                onClick={logout}
                className="flex items-center px-4 py-2 text-sm text-red-400 hover:bg-gray-750 w-full text-left border-t border-gray-700 mt-1 transition"
              >
                <div className="mr-3 w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center">
                  <FiLogOut className="text-red-400" />
                </div>
                <div>
                  <div>Logout</div>
                  <div className="text-xs text-red-400/70">Sign out from account</div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
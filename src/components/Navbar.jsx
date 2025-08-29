import { Link, NavLink } from "react-router";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth(); 

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/blog", label: "Blog" },
    { path: "/student-feedback", label: "Student Feedback" },
  ];

  return (
    <nav className="bg-gray-50 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-gray-900 flex items-center space-x-2 transition-transform duration-300 hover:scale-105"
        >
          <img
            src="logo.png"
            width="32"
            alt="EduTrack Logo"
            className="rounded-full"
          />
          <span className="bg-clip-text text-transparent bg-teal-700 outfit">
            EduTrack
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-md text-gray-600 transition-colors duration-300 hover:text-teal-700 outfit font-semibold ${
                    isActive ? "text-teal-700 font-semibold outfit" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {open ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <ul className="absolute top-16 left-0 w-full bg-gray-50 text-gray-700 flex flex-col items-center space-y-6 py-8 md:hidden shadow-xl transform transition-all duration-300 ease-in-out z-50">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-medium transition-colors duration-300 hover:text-teal-700 outfit ${
                      isActive ? "text-teal-700 font-semibold outfit" : ""
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              {user ? (
                <Link to={"/dashboard"}>
                  <button
                    className="px-6 py-2 text-sm font-semibold text-white bg-teal-700 rounded-full hover:bg-teal-600 transition-colors duration-300"
                    onClick={() => setOpen(false)}
                  >
                    My Account
                  </button>
                </Link>
              ) : (
                <Link to={"/login"}>
                  <button
                    className="px-6 py-2 text-sm font-semibold text-white bg-teal-700 rounded-full hover:bg-teal-600 transition-colors duration-300"
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </button>
                </Link>
              )}
            </li>
          </ul>
        )}

        {/* Desktop Login/My Account Button */}
        {user ? (
          <Link to={"/dashboard"}>
            <button className="group relative h-12 overflow-hidden overflow-x-hidden rounded-full bg-teal-700 px-14 py-2 text-neutral-50">
              <span className="relative z-10">My Account</span>
              <span className="absolute inset-0 overflow-hidden rounded-md">
                <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-[#ffffff1f] transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
              </span>
            </button>
          </Link>
        ) : (
          <Link to={"/login"}>
            <button className="group relative h-12 overflow-hidden overflow-x-hidden rounded-full bg-teal-700 px-14 py-2 text-neutral-50">
              <span className="relative z-10">Login</span>
              <span className="absolute inset-0 overflow-hidden rounded-md">
                <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-[#ffffff1f] transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
              </span>
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}

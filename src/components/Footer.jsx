import { motion } from "framer-motion";
import { FiMapPin, FiMail, FiPhone, FiChevronRight, FiLayers } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 py-16 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Brand Info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <FiLayers className="text-teal-600 text-3xl" />
            <h2 className="text-2xl font-bold text-teal-600">EduTrack</h2>
          </div>
          <p className="mt-4 text-gray-500 leading-relaxed">
            Your ultimate toolkit to make student life simpler, smarter, and more organized.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
          <ul className="space-y-3">
            {[
              { name: "Home", link: "/" },
              { name: "About", link: "/about" },
              { name: "Features", link: "/features" },
              { name: "Contact", link: "/contact" },
            ].map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.link}
                  className="flex items-center gap-2 group text-gray-600 hover:text-teal-600 transition"
                >
                  <FiChevronRight className="text-sm group-hover:translate-x-1 transition-transform" />
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center gap-2">
              <FiMapPin className="text-teal-600" /> Dhaka, Bangladesh
            </li>
            <li className="flex items-center gap-2">
              <FiMail className="text-teal-600" /> support@edutrack.com
            </li>
            <li className="flex items-center gap-2">
              <FiPhone className="text-teal-600" /> +880 1234-567890
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Bottom Line */}
      <motion.div
        className="border-t border-gray-200 mt-12 pt-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} <span className="font-semibold text-teal-600">EduTrack</span>. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}

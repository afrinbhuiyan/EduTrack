import React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { IoClose } from 'react-icons/io5'

export default function Sidebar({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
    {isOpen && (
      <>
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        />

        {/* Sidebar */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30 }}
          className="fixed right-0 top-0 h-full w-full lg:w-96 bg-white z-50 shadow-2xl overflow-y-auto"
        >
          <div className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6 mx-4">
              <h2 className="text-xl font-bold">Class Form</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <IoClose size={24} />
              </button>
            </div>
            <div className="flex-1">{children}</div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
  )
}
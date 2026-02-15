import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiTrendingUp,
  FiTrendingDown,
  FiRepeat,
  FiMapPin,
  FiEdit3,
  FiX,
  FiArrowRight,
  FiArrowLeft,
  FiCalendar,
  FiTag,
  FiDollarSign,
  FiMessageSquare,
  FiNavigation,
} from "react-icons/fi";
import { categories } from "../../utils/categories";

const TransactionForm = ({ onAddTransaction }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [newTx, setNewTx] = useState({
    type: "expense",
    amount: "",
    note: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    recurring: false,
    location: "",
  });

  const [quickAmounts] = useState([10, 20, 50, 100, 200, 500, 1000, 5000]);
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const [customAmount, setCustomAmount] = useState("");

  const handleChange = (e) => {
    setNewTx({ ...newTx, [e.target.name]: e.target.value });
  };

  const handleQuickAmount = (amount) => {
    setNewTx({ ...newTx, amount: amount.toString() });
    setShowCustomAmount(false);
    setTimeout(() => nextStep(), 300);
  };

  const handleCustomAmount = () => {
    if (customAmount) {
      setNewTx({ ...newTx, amount: customAmount });
      setCustomAmount("");
      setShowCustomAmount(false);
      setTimeout(() => nextStep(), 300);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTx.amount || !newTx.category) return;

    // Set default category if not selected
    const transactionCategory = newTx.category;

    const transaction = {
      id: Date.now(),
      ...newTx,
      category: transactionCategory,
      amount: Math.abs(Number(newTx.amount)),
      date: new Date(newTx.date).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      timestamp: new Date().toISOString(),
    };

    // Call parent function
    onAddTransaction(transaction);

    // Reset form
    resetForm();
    setIsModalOpen(false);
  };

  const resetForm = () => {
    setNewTx({
      type: "expense",
      amount: "",
      note: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      recurring: false,
      location: "",
    });
    setCurrentStep(1);
    setShowCustomAmount(false);
    setCustomAmount("");
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCategorySelect = (category) => {
    setNewTx({ ...newTx, category });
    setTimeout(() => nextStep(), 300);
  };

  const handleTypeSelect = (type) => {
    setNewTx({ ...newTx, type });
    setTimeout(() => nextStep(), 300);
  };

  // Step 1: Amount Selection
  const renderStep1 = () => (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        {/* <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
          <FiDollarSign className="text-2xl text-white" />
        </div> */}
        <h3 className="text-2xl font-bold text-gray-800">How much?</h3>
        <p className="text-gray-500">Enter the transaction amount</p>
      </div>

      {/* Quick Amount Grid */}
      <div className="grid grid-cols-4 gap-3">
        {quickAmounts.map((amount) => (
          <motion.button
            key={amount}
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleQuickAmount(amount)}
            className={`p-2 rounded-md font-medium transition-all ${
              newTx.amount === amount.toString()
                ? "bg-[#3d91af] text-white"
                : " border border-gray-300 hover:bg-gray-200 text-gray-700"
            }`}
          >
            <span className="text-lg font-semibold">${amount}</span>
          </motion.button>
        ))}
      </div>

      {/* Custom Amount */}
      {showCustomAmount ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">
              $
            </span>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Enter custom amount"
              className="w-full pl-12 text-black p-2 text-lg border-1 border-gray-200 rounded-md focus:border-[#3d91af] focus:ring-1 focus:ring-[#7ea6b3] outline-none transition-all"
              autoFocus
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowCustomAmount(false)}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCustomAmount}
              className="flex-1 py-3 bg-[#3d91af] text-white rounded-md font-medium hover:bg-[#2a7a9c] transition-all"
            >
              Set Amount
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => setShowCustomAmount(true)}
          className="w-full p-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-3"
        >
          <FiEdit3 className="text-lg" />
          <span className="font-semibold">Custom Amount</span>
        </motion.button>
      )}
    </motion.div>
  );



  // Step 2: Transaction Type
  const renderStep2 = () => (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        
        <h3 className="text-2xl font-semibold text-gray-800">Type</h3>
        <p className="text-gray-500">Income or Expense?</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleTypeSelect("income")}
          className={`p-5 rounded-md flex flex-col items-center justify-center gap-2 border-2 border-[#3cca72] transition-all ${
            newTx.type === "income"
              ? "bg-[#3cca722c] text-white border-[#3cca72]"
              : "bg-green-500/5 hover:bg-emerald-50 text-green-700"
          }`}
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              newTx.type === "income" ? "bg-white/20" : "bg-emerald-100"
            }`}
          >
            <FiTrendingUp
              className={`text-2xl ${
                newTx.type === "income" ? "text-emerald-500" : "text-emerald-600"
              }`}
            />
          </div>
          <div className="text-center">
            <p
              className={`text-lg font-bold ${
                newTx.type === "income" ? "text-black" : "text-emerald-700"
              }`}
            >
              Income
            </p>
            <p
              className={`text-sm ${
                newTx.type === "income"
                  ? "text-emerald-100"
                  : "text-emerald-500"
              }`}
            >
              Money coming in
            </p>
          </div>
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleTypeSelect("expense")}
          className={`p-6 rounded-lg flex flex-col items-center justify-center gap-3 transition-all ${
            newTx.type === "expense"
              ? "bg-[#ff5c5c0e] text-red-500 border-2 border-[#ff5c5c]"
              : "bg-rose-50 hover:bg-rose-100"
          }`}
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              newTx.type === "expense" ? "bg-[#ff5c5c2c]" : "bg-rose-100"
            }`}
          >
            <FiTrendingDown
              className={`text-2xl ${
                newTx.type === "expense" ? "text-red-500" : "text-rose-600"
              }`}
            />
          </div>
          <div className="text-center">
            <p
              className={`text-lg font-bold ${
                newTx.type === "expense" ? "text-red-500" : "text-rose-700"
              }`}
            >
              Expense
            </p>
            <p
              className={`text-sm ${
                newTx.type === "expense" ? "text-rose-300" : "text-rose-500"
              }`}
            >
              Money going out
            </p>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );

    // Step 3: Transaction Type
  const renderStep3 = () => (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6 "
    >
      <div className="text-center mb-6">
        {/* <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
          <FiTag className="text-2xl text-white" />
        </div> */}
        <h3 className="text-2xl font-semibold text-gray-800">Category</h3>
        <p className="text-gray-500">What's this for?</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {categories[newTx.type].map((cat) => (
          <motion.button
            key={cat.value}
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleCategorySelect(cat.value)}
            className={`p-3 rounded-md flex flex-col items-center justify-center gap-1 transition-all ${
              newTx.category === cat.value
                ? "bg-[#3d91af1a] text-white border-2 border-[#3d91af]"
                : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
            }`}
          >
            <span className="text-2xl text-black">
              {typeof cat.icon === "string" ? cat.icon : <cat.icon />}
            </span>{" "}
            <span className="text-2xl">{cat.icon}</span>
            <span className="font-medium text-gray-700">{cat.label}</span>
            
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  // Step 4: Details
  const renderStep4 = () => (
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className=""
    >
      <div className="text-center mb-3">

        <h3 className="text-2xl font-semibold text-gray-800">Details</h3>
        <p className="text-gray-500">Add some context</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 mb-4">
           <p className="pb-2.5"> Description</p>
          </label>
          <div className="relative">
            <textarea
              name="note"
              value={newTx.note}
              onChange={handleChange}
              placeholder="What's this transaction for?"
              rows="3"
              className="w-full p-4 text-black border border-gray-500/50 rounded-lg focus:border-[#3d91af] focus:ring-2 focus:ring-[#3d91af21] outline-none resize-none transition-all"
              required
            />
            <div className="absolute right-3 bottom-3 text-gray-400">
              <FiMessageSquare />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            
            <p className="pb-2.5">Location (Optional)</p>
          </label>
          <div className="relative">
            <FiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="location"
              value={newTx.location}
              onChange={handleChange}
              placeholder="Where was this?"
              className="w-full pl-12 p-3 text-black border border-gray-500/50 rounded-lg focus:border-[#3d91af] focus:ring-2 focus:ring-[#3d91af21] outline-none transition-all"
            />
          </div>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            <p className="pb-2.5">Date</p>
          </label>
          <div className="relative">
            <FiCalendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              name="date"
              value={newTx.date}
              onChange={handleChange}
              className="w-full pl-12 p-3 text-black border border-gray-500/50 rounded-lg focus:border-[#3d91af] focus:ring-2 focus:ring-[#3d91af21] outline-none transition-all"
            />
          </div>
        </div>

        {/* Recurring Option */}
        <motion.label
          whileHover={{ scale: 1.01 }}
          className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all ${
            newTx.recurring
              ? "bg-blue-50 border-1 border-[#3d91af]"
              : "bg-gray-50 hover:bg-gray-100"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                newTx.recurring ? "bg-[#3d91af]/10" : "bg-gray-200"
              }`}
            >
              <FiRepeat
                className={`text-lg ${newTx.recurring ? "text-[#3d91af]" : "text-gray-500"}`}
              />
            </div>
            <div>
              <p className="font-medium text-gray-800">Make this recurring</p>
              <p className="text-sm text-gray-500">Repeat monthly</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={newTx.recurring}
            onChange={(e) =>
              setNewTx({ ...newTx, recurring: e.target.checked })
            }
            className="w-6 h-6 rounded-lg text-[#3d91af] focus:ring-[#3d91af]"
          />
        </motion.label>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={prevStep}
            className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <FiArrowLeft />
            Back
          </button>
          <button
            type="submit"
            disabled={!newTx.note}
            className="flex-1 py-3 bg-[#3d91af] text-white rounded-lg font-bold hover:bg-[#2c7a9a] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <FiPlus />
            Add Transaction
          </button>
        </div>
      </form>
    </motion.div>
  );

  // Progress Steps
  const ProgressSteps = () => (
    <div className="flex items-center justify-center gap-2">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-medium transition-all ${
              currentStep === step
                ? "bg-[#3d91af] text-white"
                : step < currentStep
                  ? "bg-[#e0f2f1] text-[#3d91af]"
                  : "bg-gray-200 text-gray-400"
            }`}
          >
            {step}
          </div>
          {step < 4 && (
            <div
              className={`w-12 h-1 mx-2 ${
                step < currentStep ? "bg-[#3d91af]" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Add Transaction Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6"
      >
        <div className="text-center space-y-4">

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="w-full py-2 bg-white rounded-sm hover:bg-gray-100 transition-all shadow-sm text-[#2d739b] flex items-center justify-center gap-2"
          >
            <FiPlus /> Add New Transaction
          </motion.button>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-xl shadow-2xl z-50 "
            >
              {/* Modal Header */}
              <div className="relative p-6 border-b border-gray-100">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute -top-9 -right-10 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <FiX className="text-gray-600 text-2xl" />
                </button>

                <ProgressSteps />
              </div>

              {/* Modal Body */}
              <div className="p-6 max-h-[70vh] overflow-y-auto custom-scroll ">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && renderStep1()}
                  {currentStep === 2 && renderStep2()}
                  {currentStep === 3 && renderStep3()}
                  {currentStep === 4 && renderStep4()}
                </AnimatePresence>
              </div>

              {/* Step Navigation (for steps 1-3) */}
              {currentStep < 4 && (
                <div className="p-6 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                        currentStep === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      <FiArrowLeft />
                      Back
                    </button>

                    <div className="text-sm text-gray-500">
                      Step {currentStep} of 4
                    </div>

                    <button
                      onClick={nextStep}
                      disabled={
                        (currentStep === 1 && !newTx.amount) ||
                        (currentStep === 2 && !newTx.category) ||
                        (currentStep === 3 && !newTx.type)
                      }
                      className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                        (currentStep === 1 && !newTx.amount) ||
                        (currentStep === 2 && !newTx.category) ||
                        (currentStep === 3 && !newTx.type)
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-[#3d91af] text-white hover:bg-[#2c7a9a]"
                      }`}
                    >
                      Next
                      <FiArrowRight />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default TransactionForm;

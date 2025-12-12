import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiTarget, FiAward, FiTrash2 } from "react-icons/fi";

const BudgetGoals = ({ 
  budgetGoals, 
  setBudgetGoals 
}) => {
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    target: "",
    deadline: "",
  });

  const addBudgetGoal = (e) => {
    e.preventDefault();
    if (!newGoal.name || !newGoal.target) return;

    const goal = {
      id: Date.now(),
      ...newGoal,
      target: Number(newGoal.target),
      current: 0,
      completed: false,
    };

    setBudgetGoals([...budgetGoals, goal]);
    setNewGoal({ name: "", target: "", deadline: "" });
    setShowGoalForm(false);
  };

  const completeGoal = (id) => {
    setBudgetGoals(
      budgetGoals.map((goal) =>
        goal.id === id ? { ...goal, completed: true } : goal
      )
    );
  };

  const deleteGoal = (id) => {
    setBudgetGoals(budgetGoals.filter((g) => g.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/80 rounded-lg p-5 shadow-sm border border-emerald-100/50"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold flex items-center gap-2 text-emerald-700">
          <FiTarget className="text-emerald-500" />
          My Goals
        </h3>
        <button
          onClick={() => setShowGoalForm(!showGoalForm)}
          className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-emerald-200 transition-colors"
        >
          {showGoalForm ? "Cancel" : "New"}
        </button>
      </div>

      {showGoalForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          onSubmit={addBudgetGoal}
          className="mb-4 space-y-3 p-4 bg-emerald-50 rounded-lg"
        >
          <input
            type="text"
            value={newGoal.name}
            onChange={(e) =>
              setNewGoal({ ...newGoal, name: e.target.value })
            }
            placeholder="Goal name"
            className="w-full p-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white"
          />
          <input
            type="number"
            value={newGoal.target}
            onChange={(e) =>
              setNewGoal({ ...newGoal, target: e.target.value })
            }
            placeholder="Target amount"
            className="w-full p-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white"
          />
          <div className="flex gap-2">
            <input
              type="date"
              value={newGoal.deadline}
              onChange={(e) =>
                setNewGoal({ ...newGoal, deadline: e.target.value })
              }
              className="flex-1 p-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white"
            />
            <button
              type="submit"
              className="bg-emerald-500 text-white px-4 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
            >
              Add
            </button>
          </div>
        </motion.form>
      )}

      <div className="space-y-3 max-h-60 overflow-y-auto">
        {budgetGoals.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No goals set yet
          </p>
        ) : (
          budgetGoals.map((goal) => (
            <div
              key={goal.id}
              className={`p-3 rounded-lg border ${
                goal.completed
                  ? "bg-emerald-50 border-emerald-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <p
                  className={`font-medium ${
                    goal.completed
                      ? "text-emerald-700"
                      : "text-gray-800"
                  }`}
                >
                  {goal.name}
                </p>
                <div className="flex gap-1">
                  {!goal.completed && (
                    <button
                      onClick={() => completeGoal(goal.id)}
                      className="text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      <FiAward />
                    </button>
                  )}
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="text-red-600 hover:text-red-700 transition-colors"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Target: ${goal.target.toLocaleString()}
              </p>
              {goal.deadline && (
                <p className="text-xs text-gray-500 mt-1">
                  Deadline: {goal.deadline}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default BudgetGoals;
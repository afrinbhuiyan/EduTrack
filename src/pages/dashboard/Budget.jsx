import { useState } from "react";

export default function Budget() {
  const [transactions, setTransactions] = useState([]);
  const [newTx, setNewTx] = useState({ type: "income", amount: "", note: "" });

  // Handle input change
  const handleChange = (e) => {
    setNewTx({ ...newTx, [e.target.name]: e.target.value });
  };

  // Add new transaction
  const addTransaction = (e) => {
    e.preventDefault();
    if (!newTx.amount || !newTx.note) return;
    setTransactions([
      ...transactions,
      { id: Date.now(), ...newTx, amount: Number(newTx.amount) },
    ]);
    setNewTx({ type: "income", amount: "", note: "" });
  };

  // Calculate totals
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);
  const balance = income - expense;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">💰 Budget Tracker</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded-xl shadow">
          <h2 className="font-semibold">Income</h2>
          <p className="text-2xl text-green-700">+${income}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-xl shadow">
          <h2 className="font-semibold">Expense</h2>
          <p className="text-2xl text-red-700">-${expense}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <h2 className="font-semibold">Balance</h2>
          <p className="text-2xl text-blue-700">${balance}</p>
        </div>
      </div>

      {/* Add Transaction Form */}
      <form
        onSubmit={addTransaction}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 bg-white p-4 shadow rounded-xl"
      >
        <select
          name="type"
          value={newTx.type}
          onChange={handleChange}
          className="p-2 border rounded-lg"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="number"
          name="amount"
          value={newTx.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="p-2 border rounded-lg"
        />
        <input
          type="text"
          name="note"
          value={newTx.note}
          onChange={handleChange}
          placeholder="Note (e.g., Rent, Books)"
          className="p-2 border rounded-lg"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
        >
          ➕ Add
        </button>
      </form>

      {/* Transactions Table */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Note</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b hover:bg-gray-50">
                <td
                  className={`p-3 font-semibold ${
                    tx.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {tx.type}
                </td>
                <td className="p-3">${tx.amount}</td>
                <td className="p-3">{tx.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

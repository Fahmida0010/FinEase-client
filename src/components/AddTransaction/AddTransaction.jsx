import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Footer from "../Footer/Footer";
import API from "../../api/axiosInstance";
import { AuthContext } from "../../context/AuthProvider";

const categories = [
  "Food",
  "Salary",
  "Shopping",
  "Bills",
  "Entertainment",
  "Investment",
  "Transportation",
  "Others",
];

const AddTransaction = ({ existingTransaction }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    type: "income",
    category: "",
    amount: "",
    description: "",
    date: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.displayName || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    if (existingTransaction) {
      setFormData(existingTransaction);
    }
  }, [existingTransaction]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (existingTransaction) {
        await API.put(`/transactions/${existingTransaction._id}`, formData);
        Swal.fire("Success", "Transaction updated successfully!", "success");
      } else {
        await API.post("/add-transaction", formData);
        Swal.fire("Success", "Transaction added successfully!", "success");
      }

      navigate("/my-transactions");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to process request", "error");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl text-blue-700 font-semibold mb-4">Add Transaction</h2>

      <form 
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-sky-300 p-6 rounded shadow space-y-4 mt-6"
      >
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border p-2 rounded "
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Category */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Amount */}
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Description */}
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Date */}
        <input
          type="date"
          name="date"
          value={formData.date?.slice(0, 10) || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Read-only name & email */}
        <input
          type="text"
          value={formData.name}
          readOnly
          className="w-full border p-2 rounded bg-gray-300"
        />

        <input
          type="email"
          value={formData.email}
          readOnly
          className="w-full border p-2 rounded bg-gray-300"
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {existingTransaction ? "Update Transaction" : "Add Transaction"}
        </button>
      </form>

      <Footer />
    </div>
  );
};

export default AddTransaction;


import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Footer from "../Footer/Footer";
import { AuthContext } from "../../context/AuthProvider";
import API from "../../API/axiosInstance";

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
    <div className="container mx-auto p-6 min-h-screen text-base-content">
      {/* Title changed to text-primary to support dark mode */}
      <h2 className="text-2xl font-semibold mb-4 text-center text-primary">
        {existingTransaction ? "Update Transaction" : "Add Transaction"}
      </h2>

      <form 
        onSubmit={handleSubmit}
        // bg-sky-300 replaced with bg-base-200 or card background
        className="max-w-md mx-auto bg-base-200 p-6 rounded-xl shadow-xl space-y-4 mt-6 border border-base-300"
      >
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="select select-bordered w-full bg-base-100"
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
          className="select select-bordered w-full bg-base-100"
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
          className="input input-bordered w-full bg-base-100"
          required
        />

        {/* Description */}
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="input input-bordered w-full bg-base-100"
          required
        />

        {/* Date */}
        <input
          type="date"
          name="date"
          value={formData.date?.slice(0, 10) || ""}
          onChange={handleChange}
          className="input input-bordered w-full bg-base-100"
          required
        />

        {/* Read-only name & email - styled to look disabled but readable */}
        <input
          type="text"
          value={formData.name}
          readOnly
          className="input input-bordered w-full bg-base-300 cursor-not-allowed opacity-70"
        />

        <input
          type="email"
          value={formData.email}
          readOnly
          className="input input-bordered w-full bg-base-300 cursor-not-allowed opacity-70"
        />

        <button
          type="submit"
          className="btn btn-primary w-full text-white"
        >
          {existingTransaction ? "Update Transaction" : "Add Transaction"}
        </button>
      </form>

      <Footer />
    </div>
  );
};

export default AddTransaction;
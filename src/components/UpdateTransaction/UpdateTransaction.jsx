import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import API from '../../API/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';

const UpdateTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: "",
    category: "",
    amount: "",
    description: "",
    date: ""
  });

  // Get transaction by ID
  const fetchTransaction = async () => {
    try {
      const res = await API.get(`/transactions/${id}`);
      const data = res.data;

      setForm({
        type: data.type,
        category: data.category,
        amount: data.amount,
        description: data.description,
        date: data.date.split("T")[0]
      });

    } catch (err) {
      toast.error("Failed to load data");
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/transactions/${id}`, form);

      toast.success("Transaction updated!", {
        onClose: () => navigate(`/updatedetails/${id}`) // ⬅ Redirect to details
      });

    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <ToastContainer />

      <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-800">Update Transaction</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow p-5 rounded flex flex-col gap-3 transition-colors duration-300"
      >
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
          required
        >
          <option value="" className="dark:bg-gray-700">Select Type</option>
          <option value="income" className="dark:bg-gray-700">Income</option>
          <option value="expense" className="dark:bg-gray-700">Expense</option>
        </select>

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none placeholder-gray-400 dark:placeholder-gray-300"
          required
        />

        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none placeholder-gray-400 dark:placeholder-gray-300"
          required
        />

        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none placeholder-gray-400 dark:placeholder-gray-300"
          required
        />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors font-medium"
        >
          Update Transaction
        </button>
      </form>
    </div>
  );
};

export default UpdateTransaction;
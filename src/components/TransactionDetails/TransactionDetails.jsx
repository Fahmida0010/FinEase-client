import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";
import API from "../../API/axiosInstance";
import { FaArrowLeft, FaExchangeAlt, FaTag, FaCalendarAlt, FaUser, FaWallet } from "react-icons/fa";

const TransactionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await API.get(`/transactions/${id}`);

        // Ensure amount fields are numbers
        const data = {
          ...res.data,
          amount: Number(res.data.amount),
          totalAmountOfCategory: Number(res.data.totalAmountOfCategory),
        };

        setTransaction(data);
      } catch (err) {
        console.error(err);
        Swal.fire({
          title: "Error",
          text: err.response?.data?.message || "Failed to load transaction",
          icon: "error",
          background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#fff",
          color: document.documentElement.classList.contains("dark") ? "#fff" : "#000",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTransaction();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (!transaction)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-900 dark:text-white transition-colors duration-300">
        <p className="text-xl font-medium">Transaction not found</p>
        <button 
          onClick={() => navigate(-1)} 
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4 pb-12 transition-colors duration-300">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium group transition-colors"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
        Back to Transactions
      </button>

      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-all">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Transaction Details</h2>
              <p className="opacity-80 text-sm mt-2 font-mono bg-white/10 w-fit px-2 py-1 rounded">
                Ref: #{id?.slice(-12).toUpperCase()}
              </p>
            </div>
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
              <FaWallet className="text-3xl text-white" />
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Main Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            
            {/* Left Side */}
            <div className="space-y-8">
              <div className="flex items-center gap-5">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400">
                  <FaExchangeAlt size={22} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-[0.1em] font-bold">Transaction Type</p>
                  <p className="text-xl font-bold capitalize text-gray-900 dark:text-white">{transaction.type}</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-2xl text-purple-600 dark:text-purple-400">
                  <FaTag size={22} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-[0.1em] font-bold">Category</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{transaction.category}</p>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="space-y-8">
              <div className="flex items-center gap-5">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600 dark:text-emerald-400">
                  <FaCalendarAlt size={22} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-[0.1em] font-bold">Date Processed</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {new Date(transaction.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-2xl text-orange-600 dark:text-orange-400">
                  <FaUser size={22} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-[0.1em] font-bold">Transacted By</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{transaction.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Amount Showcase */}
          <div className="mb-10 bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-700/50 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
             <p className="text-gray-500 dark:text-gray-400 font-medium mb-1 uppercase text-xs tracking-widest">Net Amount</p>
             <h3 className="text-5xl font-black text-blue-600 dark:text-blue-400">
                ৳{transaction.amount.toLocaleString()}
             </h3>
          </div>

          {/* Description */}
          <div className="mb-10 group">
            <h4 className="text-xs text-gray-400 dark:text-gray-500 uppercase font-bold mb-3 tracking-widest">Notes / Description</h4>
            <div className="p-5 bg-gray-50 dark:bg-gray-900/20 rounded-2xl border-l-4 border-indigo-500 transition-all group-hover:bg-indigo-50/30 dark:group-hover:bg-indigo-900/10">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                {transaction.description || "No specific details provided for this transaction."}
              </p>
            </div>
          </div>

          {/* Analysis Footer */}
          <div className="pt-8 border-t dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <p className="text-sm">Summary for <span className="font-bold text-gray-700 dark:text-gray-300">{transaction.category}</span></p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 px-6 py-3 rounded-2xl">
              <span className="text-indigo-600 dark:text-indigo-300 text-sm font-medium mr-2">Category Total:</span>
              <span className="text-indigo-700 dark:text-indigo-200 font-black text-lg">
                ৳{transaction.totalAmountOfCategory.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
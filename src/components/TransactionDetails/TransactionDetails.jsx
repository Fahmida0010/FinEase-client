import { useEffect, useState } from "react";
import { useParams } from "react-router";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";
import API from "../../api/axiosInstance";

const TransactionDetails = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await API.get(`/transactions/${id}`);
        setTransaction(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", err.response?.data?.message || "Failed to load transaction", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchTransaction();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (!transaction)
    return (
      <div className="text-center mt-10">
        <p>Transaction not found</p>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Transaction Details</h2>

      <p className="text-lg font-semibold">
        Type: <span className="capitalize">{transaction.type}</span>
      </p>

      <p className="text-gray-700">
        Category: <span className="font-semibold">{transaction.category}</span>
      </p>

      <p className="text-gray-700">
        Amount: <span className="font-semibold">৳ {transaction.amount}</span>
      </p>

      <p className="text-gray-700">
        Description: {transaction.description}
      </p>

      <p className="text-gray-700">
        Date: {new Date(transaction.date).toLocaleDateString()}
      </p>

      <p className="text-gray-700 mt-3">
        User: {transaction.name} ({transaction.email})
      </p>

      <p className="text-blue-600 font-semibold mt-4">
        Total Amount in "{transaction.category}" category: ৳ {transaction.totalAmountOfCategory}
      </p>
    </div>
  );
};

export default TransactionDetails;

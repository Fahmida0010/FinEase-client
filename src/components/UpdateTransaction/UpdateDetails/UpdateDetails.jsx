import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import API from "../../../API/axiosInstance";
import { ToastContainer, toast } from "react-toastify";

const UpdateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch 
  const fetchDetails = async () => {
    try {
      const res = await API.get(`/transactions/${id}`);
      setDetails(res.data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load details");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-10 text-xl font-semibold dark:text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-lg min-h-screen transition-colors duration-300">
      <ToastContainer />

      <h2 className="text-3xl font-bold mb-6 text-center text-green-500 dark:text-green-400">
        Updated Details
      </h2>

      <div className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-xl space-y-4 border border-transparent dark:border-gray-700">

        <div className="pb-2 border-b border-gray-100 dark:border-gray-700">
          <p className="text-pink-700 dark:text-pink-400 font-semibold">Type</p>
          <p className="text-lg font-semibold capitalize text-gray-900 dark:text-gray-100">{details.type}</p>
        </div>

        <div className="pb-3 border-b border-gray-100 dark:border-gray-700">
          <p className="text-pink-700 dark:text-pink-400 font-semibold">Description</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{details.description}</p>
        </div>

        <div className="pb-3 border-b border-gray-100 dark:border-gray-700">
          <p className="text-pink-700 dark:text-pink-400 font-semibold">Category</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{details.category}</p>
        </div>

        <div className="pb-3 border-b border-gray-100 dark:border-gray-700">
          <p className="text-pink-700 dark:text-pink-400 font-semibold">Amount</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">${details.amount}</p>
        </div>

        <div>
          <p className="text-pink-700 dark:text-pink-400 font-semibold">Date</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {details.date?.split("T")[0]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpdateDetails;
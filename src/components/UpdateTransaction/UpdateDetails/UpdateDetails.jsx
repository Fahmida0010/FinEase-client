import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import API from "../../../api/axiosInstance";
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
      <div className="text-center py-10 text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="container bg-amber-300   mx-auto p-6 max-w-lg">
      <ToastContainer />

      <h2 className="text-3xl font-bold mb-6 text-center text-green-500">
    Updated Details
      </h2>

      <div className="bg-white shadow-lg p-6 rounded-xl space-y-4">

        <div className="pb-2">
          <p className="text-pink-700 font-semibold">Type</p>
          <p className="text-lg font-semibold capitalize">{details.type}</p>
        </div>

        <div className="pb-3">
          <p className="text-pink-700 font-semibold">Description</p>
          <p className="text-lg font-semibold">{details.description}</p>
        </div>

        <div className="pb-3">
          <p className="text-pink-700 font-semibold">Category</p>
          <p className="text-lg font-semibold">{details.category}</p>
        </div>

        <div className=" pb-3">
          <p className="text-pink-700 font-semibold">Amount</p>
          <p className="text-lg font-semibold">${details.amount}</p>
        </div>

        <div>
          <p className="text-pink-700 font-semibold">Date</p>
          <p className="text-lg font-semibold">
            {details.date?.split("T")[0]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpdateDetails;

import { Link } from "react-router-dom";

const TransactionCard = ({ item, handleDelete }) => {
  return (
    <div className="border rounded-xl shadow-md p-5 bg-white dark:bg-gray-800">
      <p className="text-lg font-bold capitalize">
        {item.type === "income" ? "Income 💰" : "Expense 🔻"}
      </p>

      <p className="text-gray-600 dark:text-gray-300">
        Category: <span className="font-semibold">{item.category}</span>
      </p>

      <p className="text-gray-600 dark:text-gray-300">
        Amount: <span className="font-semibold">${item.amount}</span>
      </p>

      <p className="text-gray-600 dark:text-gray-300">
        Date: <span>{new Date(item.date).toLocaleDateString()}</span>
      </p>

      <div className="flex justify-between mt-4">
        <Link
          to={`/transactions/${item._id}`}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          View
        </Link>

        <Link
          to={`/transaction/update/${item._id}`}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
        >
          Update
        </Link>
        <button
          onClick={() => handleDelete(item._id)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TransactionCard;

import React, { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";
import { Link } from "react-router";
import Card from "../Card/Card.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import API from "../../api/axiosInstance.js";


const Home = () => {
  const [summary, setSummary] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const res = await API.get("/summary");
        setSummary(res.data || { totalBalance: 0, totalIncome: 0, totalExpense: 0 });
      } catch (err) {
        console.error(err);
        setSummary({ totalBalance: 0, totalIncome: 0, totalExpense: 0 });
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-6">
      <section className="mt-6 mb-6 space-y-6">
        <div className="flex flex-col md:flex-row items-center bg-gray-200 rounded-lg shadow-lg overflow-hidden">
          <img
            src="https://i.postimg.cc/Y2NXjzT8/finance.jpg"
            alt=""
            className="w-full md:w-1/2 h-auto object-cover"
          />
          <div className="p-6 md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Manage Your Money
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Track your income and expenses effortlessly with FinEase. Gain clear insights into your
              spending habits, categorize your transactions, and monitor your savings growth over time.
              FinEase empowers you to stay on top of your finances, reduce unnecessary
              expenses, and plan for a secure future with ease and confidence.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row-reverse items-center bg-gray-200 rounded-lg shadow-lg overflow-hidden">
          <img
            src="https://i.postimg.cc/HWt2Tsyp/stack-money.jpg"
            alt=""
            className="w-full md:w-1/2 h-auto object-cover"
          />
          <div className="p-6 md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Grow Your Savings
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Categorize your transactions and monitor your financial progress with ease.
              Track income and expenses, identify spending patterns,
              and make data-driven decisions to achieve your financial goals faster.
              Interactive visual charts and detailed insights help you understand
              where your money goes, optimize your budget, and stay on top of your
              finances at all times. FinEase ensures you can plan your savings
              efficiently, reduce unnecessary expenses, and build a secure financial
              future.
            </p>
          </div>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card title="Total Balance" value={`৳ ${summary.totalBalance}`} variant="primary"/>
        <Card title="Total Income" value={`৳ ${summary.totalIncome}`} variant="success"/>
        <Card title="Total Expense" value={`৳ ${summary.totalExpense}`} variant="danger"/>
      </section>

      {/* Static Sections */}
      <section className="grid md:grid-cols-2 gap-6 bg-amber-300">
        <div className="bg-yellow-200 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Budgeting Tips</h2>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            <li>Track every expense for a month.</li>
            <li>Set aside emergency savings first.</li>
            <li>Use categories to limit unnecessary spending.</li>
          </ul>
        </div>
        <div className="bg-yellow-200 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Why Financial Planning Matters</h2>
          <p className="text-sm text-gray-700">
            Good financial planning reduces daily stress by giving you a clear roadmap for income, spending, and saving.
            It helps you stay organized, avoid unnecessary expenses, and prepare for unexpected challenges.
            By setting realistic goals and tracking your progress, you gain control over your finances and peace of mind for the future.
          </p>
        </div>
      </section>

      {/* Add Transaction Button */}
      <div className="mt-8">
        <Link to="/add-transaction" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Transaction
        </Link>
      </div>

      <div className="mt-12"></div>
      <Footer />
    </div>
  );
};

export default Home;

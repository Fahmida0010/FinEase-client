import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Swal from 'sweetalert2';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import Footer from '../Footer/Footer';
import API from '../../api/axiosInstance';

const Reports = () => {
  const [data, setData] = useState({
    categoryDistribution: [],
    monthlyTotals: [],
  });
  const [loading, setLoading] = useState(false);
  const [monthFilter, setMonthFilter] = useState('');

  const fetchReports = async () => {
    setLoading(true);
    try {
      const reportsRes = await API.get('/reports');
      setData(reportsRes.data);
    } catch (err) {
      console.error("Fetch Error:", err);
      Swal.fire('Error', err.response?.data?.message || 'Failed to fetch reports', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const filteredMonthly = monthFilter
    ? data.monthlyTotals.filter((m) => m._id === monthFilter)
    : data.monthlyTotals;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl text-blue-700 font-semibold mb-4">Reports</h2>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="mb-6 w-full h-[350px] min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.categoryDistribution}
                  dataKey="value"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mb-6 w-full h-[350px] min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredMonthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#82ca9d" name="Income" />
                <Bar dataKey="expense" fill="#ff6b6b" name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6">
            <label className="text-sm mr-2">Filter by Month (YYYY-MM):</label>
            <input
              className="border p-2 rounded"
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              placeholder="e.g., 2025-01"
            />
          </div>
        </>
      )}

      <div className="mt-10"></div>
      <Footer />
    </div>
  );
};

export default Reports;

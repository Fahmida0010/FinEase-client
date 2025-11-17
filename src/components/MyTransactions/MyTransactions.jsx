 import React, { useContext, useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import Footer from '../Footer/Footer';
import { AuthContext } from '../../context/AuthProvider';
import API from '../../api/axiosInstance';

const MyTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const {user}=useContext(AuthContext)

  // fetch transaction 

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/transactions/${user.email}`, {
        params: { sortBy, sortOrder } 
      });
      setTransactions(res.data);
    } catch (err) { 
        console.log(err)
      Swal.fire('Error', err.response?.data?.message || 'Failed to fetch transactions', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [sortBy, sortOrder]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This transaction will be deleted permanently!',
      showCancelButton: true,
      icon: 'warning'
    });

    if (confirm.isConfirmed) {
      try {
        await API.delete(`/my-transactions/${id}`); 
        setTransactions(prev => prev.filter(t => t._id !== id));
        Swal.fire('Deleted', 'Transaction removed', 'success');
      } catch (err) {
        Swal.fire('Error', 'Delete failed', 'error');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-blue-700 font-semibold">My Transactions</h2>
        <div className="flex gap-2 items-center">
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border p-1 rounded">
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
          <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} className="border p-1 rounded">
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center">
          No transactions found.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {transactions.map(tx => (
            <div key={tx._id} className="bg-white p-4 rounded shadow flex justify-between items-start">
              <div>
                <div className="flex gap-2 items-center">
                  <span className={`px-2 py-1 rounded text-white ${tx.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {tx.type}
                  </span>
                  <strong>{tx.category}</strong>
                </div>
                <p className="text-sm text-gray-600 mt-2">{tx.description}</p>
                <p className="text-sm text-gray-500 mt-1">৳ {tx.amount} • {new Date(tx.date).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-col gap-2">
  <Link to={`/transaction/${tx._id}`} className="text-sm bg-blue-100
   text-blue-600 px-2 py-1 rounded">View</Link>
<Link to={`/update-transaction/${tx._id}`} className="text-sm bg-yellow-100
                 text-yellow-700 px-2 py-1 rounded">Update</Link>
                <button onClick={() => handleDelete(tx._id)} className="text-sm bg-red-100 text-red-600
                 px-2 py-1 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 p-10 mb-0"></div>
      <Footer />
    </div>
  );
};

export default MyTransactions;

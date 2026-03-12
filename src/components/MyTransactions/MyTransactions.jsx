import React, { useContext, useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import Footer from '../Footer/Footer';
import { AuthContext } from '../../context/AuthProvider';
import API from '../../API/axiosInstance';


const MyTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const { user } = useContext(AuthContext);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/my-transactions/${user.email}`, {
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
    if (user?.email) {
      fetchTransactions();
    }
  }, [sortBy, sortOrder, user?.email]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This transaction will be deleted permanently!',
      showCancelButton: true,
      icon: 'warning',
      background: 'bg-white',
      color: 'text-black'
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
    <div className="container mx-auto p-6 min-h-screen text-base-content">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl text-primary font-bold">My Transactions</h2>
        <div className="flex gap-2 items-center">
          <select 
            value={sortBy} 
            onChange={e => setSortBy(e.target.value)} 
            className="select select-bordered select-sm bg-base-100"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
          <select 
            value={sortOrder} 
            onChange={e => setSortOrder(e.target.value)} 
            className="select select-bordered select-sm bg-base-100"
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="bg-base-200 p-10 rounded-xl shadow text-center border border-base-300">
          <p className="text-lg opacity-70">No transactions found.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {transactions.map(tx => (
            <div key={tx._id} className="bg-base-200 p-5 rounded-xl shadow-md flex justify-between items-start border border-base-300 hover:border-primary transition-all">
              <div>
                <div className="flex gap-2 items-center">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${tx.type === 'income' ? 'bg-success' : 'bg-error'}`}>
                    {tx.type.toUpperCase()}
                  </span>
                  <strong className="text-lg">{tx.category}</strong>
                </div>
                <p className="text-sm opacity-80 mt-2 italic">"{tx.description}"</p>
                <p className="text-md font-mono font-semibold mt-2 text-primary">
                  ৳ {tx.amount} <span className="text-xs opacity-60 font-sans ml-2">• {new Date(tx.date).toLocaleDateString()}</span>
                </p>
              </div>
              
              <div className="flex flex-col gap-2">
                <Link to={`/transaction/${tx._id}`} className="btn btn-xs btn-outline btn-info">View</Link>
                <Link to={`/update-transaction/${tx._id}`} className="btn btn-xs btn-outline btn-warning">Update</Link>
                <button onClick={() => handleDelete(tx._id)} className="btn btn-xs btn-outline btn-error">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-20"></div>
      <Footer />
    </div>
  );
};

export default MyTransactions;
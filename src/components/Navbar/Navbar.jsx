import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthProvider";
import e from "cors";


const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

const [theme, setTheme]= useState(localStorage.getItem('theme') || "light")

useEffect(()=>{
   console.log(theme)
  const html = document.querySelector('html')
    html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme)
}, [theme])

const handleTheme =(checked) => {
  setTheme(checked? "dark" : "light")
}
  


  return (
    <nav className="bg-gradient-to-r from-pink-400 to-yellow-400 dark:from-gray-800 dark:to-gray-900 text-white p-4 flex justify-between items-center">
      <Link to="/" className="flex items-center text-yellow-300 space-x-2 text-xl font-bold">
        <span>💰</span>
        <span>FinEase</span>
      </Link>
      <div className="space-x-4 flex items-center">

        <Link className="hover:text-indigo-600" to="/">Home</Link>

        {user && (
          <>
     <Link className="hover:text-blue-500" to="/add-transaction">Add Transaction</Link>
       <Link className="hover:text-blue-500" to="/my-transactions">My Transactions</Link>
     <Link className="hover:text-blue-500" to="/reports">Reports</Link>
        <Link to="/my-profile" className="hover:text-blue-500">
      My Profile
    </Link>
          </>
        )}
        {!user ? (
          <Link
            to="/login"
            className="text-blue-700 font-bold bg-amber-50 px-3 py-1 rounded hover:text-blue-900"
          >
            Login
          </Link>
        ) : (
          <div className="inline-block relative">
            <img
              src={user.photoURL || "https://via.placeholder.com/40"}
              alt="avatar"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute top-10 right-0 bg-white text-black p-2 shadow-lg rounded w-48">
                <p className="font-semibold">{user.displayName}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <button
                  onClick={logout}
                  className="mt-2 bg-red-500 text-white px-2 py-1 rounded w-full"
                >
                  Log out
                </button>
              </div>
              
            )}
          </div>
        )}
    {/* theme */}
       <input  
    onChange={(e) => handleTheme(e.target.checked)}
       type="checkbox"
       defaultChecked={localStorage.getItem('theme')==="dark"}
       className="toggle"/>
      
      </div>
    </nav>
  );
};

export default Navbar;

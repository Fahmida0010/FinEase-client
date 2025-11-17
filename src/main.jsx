import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import RootLayout from "./Layout/RootLayout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import AddTransaction from "./components/AddTransaction/AddTransaction";
import MyTransactions from "./components/MyTransactions/MyTransactions";
import UpdateTransaction from "./components/UpdateTransaction/UpdateTransaction";
import Reports from "./components/Reports/Reports";
import Profile from "./components/MyProfile/MyProfile";
import NotFound from "./components/NotFound/NotFound";
import TransactionDetails from "./components/TransactionDetails/TransactionDetails";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import UpdateDetails from "./components/UpdateTransaction/UpdateDetails/UpdateDetails";
import MyProfile from "./components/MyProfile/MyProfile";



const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      // Public Routes
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },

      // Protected Routes
      {
        path: "add-transaction",
        element: (
          <PrivateRoute>
            <AddTransaction />
          </PrivateRoute>
        ),
      },
      {
        path: "my-transactions",
        element: (
          <PrivateRoute>
            <MyTransactions />
          </PrivateRoute>
        ),
      },

      {
        path: "update-transaction/:id",
        element: (
          <PrivateRoute>
            <UpdateTransaction />
          </PrivateRoute>
        ),
      },

      {
        path: "/updateDetails/:id",
        element: (
          <PrivateRoute>
            <UpdateDetails />
          </PrivateRoute>
        ),
      },

      {
        path: "transaction/:id",
        element: (
          <PrivateRoute>
            <TransactionDetails />
          </PrivateRoute>
        ),
      },

      {
        path: "reports",
        element: (
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        ),
      },

      {
        path: "my-profile",
        element: (
          <PrivateRoute>
          <MyProfile/>
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);

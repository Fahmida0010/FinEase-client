import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default PrivateRoute;

import { Navigate } from "react-router-dom";


function ProtectedRoute({

  children,

  allowedRole

}) {

  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");


  // NOT LOGGED IN
  if (!token) {

    return <Navigate to="/login" />;

  }


  // WRONG ROLE
  if (role !== allowedRole) {

    return <Navigate to="/" />;

  }


  return children;

}


export default ProtectedRoute;
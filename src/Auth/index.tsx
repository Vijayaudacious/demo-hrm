import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const useAuth = () => {
  const checkCookie = Cookies.get("authToken");
  const user = { loggedIn: checkCookie ? true : false };
  return user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;

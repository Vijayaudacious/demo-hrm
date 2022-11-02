import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ComingSoon from "../Pages/ComingSoon";
import ViewCalender from "../Pages/Calender/ViewCalender";
import Dashboard from "../Pages/Dashboard";
import AddEmployee from "../Pages/Employee/AddEmployee";
import UserDetails from "../Pages/Employee/EmployeeDetails";
import EmployeeList from "../Pages/Employee/EmployeeList";
import UserList from "../Pages/Employee/UserList";
import Layouts from "../Layout";
import LoginPage from "../Pages/Login";
import ProtectedRoutes from "../Auth";
import Reports from "../Pages/Reports";
import AddRole from "../Pages/Role/AddRole";
import RoleList from "../Pages/Role/RoleList";
// import ReportDetail from "../Pages/Reports";
import { AllPermissions } from "../Services/Users";
// import { message } from "antd";
import Empreports from "../Pages/Reports/ReportsDetail";

interface permission {
  _id?: string;
  dashBoard?: string;
  user?: string;
  leave?: string;
  role?: string;
}
const Routing = () => {
  const checkCookie = Cookies.get("authToken");
  let { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/login") {
      authRole();
    }
    // eslint-disable-next-line
  }, [pathname && checkCookie]);

  const [permission, setPermission] = useState<permission>({
    dashBoard: "",
    user: "",
    leave: "",
    role: "",
  });

  const authRole = async () => {
    try {
      const { data }: any = await AllPermissions();
      setPermission(data);
    } catch (error: any) {
      // message.error(error.message);
    }
  };

  // const permission: any = {
  //   dashBoard: "admin",
  //   user: "admin",
  //   leave: "admin",
  //   role: "admin",
  // };
  const { dashBoard, user, role, leave } = permission;

  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Layouts permission={permission} />}>
            <Route
              path="/"
              element={dashBoard ? <Dashboard leavePermission={leave} /> : null}
            />
            <Route
              path="/employee"
              element={user ? <EmployeeList userPermission={user} /> : null}
            />
            <Route
              path="/employee/?:search"
              element={user ? <EmployeeList userPermission={user} /> : null}
            />
            <Route
              path="/addemployee"
              element={
                user ? (
                  user === "write" || user === "admin" ? (
                    <AddEmployee rolePermission={role} />
                  ) : null
                ) : null
              }
            />
            <Route
              path="/editemployee/:id"
              element={
                user ? (
                  user === "write" || user === "admin" ? (
                    <AddEmployee rolePermission={role} />
                  ) : null
                ) : null
              }
            />
            <Route
              path="/details/:id"
              element={user ? <UserDetails permission={permission} /> : null}
            />
            <Route path="/user/:id" element={<UserList />} />
            <Route
              path="/role"
              element={role ? <RoleList rolePermission={role} /> : null}
            />
            <Route
              path="/role/?:search"
              element={role ? <RoleList rolePermission={role} /> : null}
            />
            <Route
              path="/calender"
              element={leave ? <ViewCalender leavePermission={leave} /> : null}
            />
            <Route
              path="/addrole"
              element={
                role ? (
                  role === "write" || role === "admin" ? (
                    <AddRole />
                  ) : null
                ) : null
              }
            />
            <Route
              path="/editrole/:id"
              element={
                role ? (
                  role === "write" || role === "admin" ? (
                    <AddRole />
                  ) : null
                ) : null
              }
            />
            <Route path="/report" element={<Reports />} />
            <Route path="/reportDetail" element={<Empreports />} />
            <Route path="coming" element={<ComingSoon />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};
export default Routing;

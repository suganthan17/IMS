import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/* User Pages */
import UserDashboard from "./pages/User/UserDashboard";
import Status from "./pages/User/Status";
import RaiseComplaint from "./pages/User/RaiseComplaint";
import MyComplaints from "./pages/User/MyComplaints";
import ComplaintDetails from "./pages/User/MyComplaintsDetails";

/* Auth Pages */
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

/* Admin Pages */
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AllComplaints from "./pages/Admin/AllComplaints";
import ManageStaff from "./pages/Admin/ManageStaff";
import UpdateStatus from "./pages/Admin/UpdateStatus";

/* Staff Pages */
import StaffDashboard from "./pages/Staff/StaffDashboard";

/* Protected Route */
const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const syncAuth = () => {
      setToken(localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", syncAuth);

    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  return (
    <Router>
      <Routes>
        {/* AUTH */}
        <Route
          path="/"
          element={
            token ? (
              role === "admin" ? (
                <Navigate to="/admin/dashboard" replace />
              ) : role === "maintenance" ? (
                <Navigate to="/staff/dashboard" replace />
              ) : (
                <Navigate to="/user/dashboard" replace />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route path="/register" element={<Register />} />

        {/* USER ROUTES */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/status"
          element={
            <ProtectedRoute role="user">
              <Status />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/raise-complaint"
          element={
            <ProtectedRoute role="user">
              <RaiseComplaint />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/my-complaints"
          element={
            <ProtectedRoute role="user">
              <MyComplaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/complaints/:id"
          element={
            <ProtectedRoute role="user">
              <ComplaintDetails />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/complaints"
          element={
            <ProtectedRoute role="admin">
              <AllComplaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-staff"
          element={
            <ProtectedRoute role="admin">
              <ManageStaff />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/update-details"
          element={
            <ProtectedRoute role="admin">
              <UpdateStatus />
            </ProtectedRoute>
          }
        />

        {/* STAFF ROUTES */}
        <Route
          path="/staff/dashboard"
          element={
            <ProtectedRoute role="maintenance">
              <StaffDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
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
import AssignComplaints from "./pages/Admin/AssignComplaints";


/* Staff Pages */
import StaffDashboard from "./pages/Staff/StaffDashboard";
import AssignedComplaints from "./pages/Staff/AssignedComplaints";
import AssignedComplaintDetails from "./pages/Staff/AssignedComplaintsDetail";


/* Protected Route */
const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/" replace />;
  if (role && userRole !== role) return <Navigate to="/" replace />;

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* AUTH ROUTES */}
        <Route path="/" element={<Login />} />
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
          path="/admin/assign-complaints"
          element={
            <ProtectedRoute role="admin">
              <AssignComplaints />
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
        <Route
          path="/staff/assigned-complaints"
          element={
            <ProtectedRoute role="maintenance">
              <AssignedComplaints />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff/complaints/:id"
          element={
            <ProtectedRoute role="maintenance">
              <AssignedComplaintDetails />
            </ProtectedRoute>
          }
        />


        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

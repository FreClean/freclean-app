import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./lib/auth.js";
import { RequireRole } from "./components/RequireRole.js";
import CustomerHome from "./pages/customer/Home.js";
import StaffDashboard from "./pages/staff/Dashboard.js";
import AdminDashboard from "./pages/admin/Dashboard.js";
import Login from "./pages/Login.js";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<CustomerHome />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/staff"
          element={
            <RequireRole role="STAFF">
              <StaffDashboard />
            </RequireRole>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireRole role="ADMIN">
              <AdminDashboard />
            </RequireRole>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

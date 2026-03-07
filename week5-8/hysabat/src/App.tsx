import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Customers from "./pages/sales/customers/Customers";
import Dashboard from "./pages/home/Dashboard";
import SalesInvoice from "./pages/sales/sales-invoice/SalesInvoice";
import CreateSalesInvoice from "./pages/sales/sales-invoice/CreateSalesInvoice";
import CustomersClearance from "./pages/sales/customers-clearance/CustomersClearance";
import UsersRoles from "./pages/settings/users-roles/UsersRoles";
import CreateRole from "./pages/settings/users-roles/CreateRole";


export default function App() {

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/login" replace />;
    return <>{children}</>;
  };

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="/customers" index element={<Customers />} />
          <Route path="/customers-clearance" index element={<CustomersClearance />} />
          <Route path="/sales-invoice" index element={<SalesInvoice />} />
          <Route path="/sales-invoice/create" index element={<CreateSalesInvoice />} />
          <Route path="/users-roles" index element={<UsersRoles />} />
          <Route path="/users-roles/create-role" index element={<CreateRole />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
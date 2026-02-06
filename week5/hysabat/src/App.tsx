import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import DashboardLayout from "./components/layouts/DashboardLayout";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import Customers from "./pages/sales/customers/Customers";
import Dashboard from "./pages/home/Dashboard";
import SalesInvoice from "./pages/sales/sales-invoice/SalesInvoice";
import CreateSalesInvoice from "./pages/sales/sales-invoice/CreateSalesInvoice";


export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/customers" index element={<Customers />} />
            <Route path="/sales-invoice" index element={<SalesInvoice />} />
            <Route path="/sales-invoice/create" index element={<CreateSalesInvoice />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
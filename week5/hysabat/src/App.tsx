import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import DashboardLayout from "./components/layouts/DashboardLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<DashboardLayout />}>
          {/* <Route index element={<Dashboard />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
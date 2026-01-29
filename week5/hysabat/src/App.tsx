import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "./pages/Login";

const DashboardLayout = () => (
  <div className="flex h-screen">
    <aside className="w-64 border-r">Sidebar</aside>
    <main className="flex-1 p-8">
      <Outlet />
    </main>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import DashboardLayout from "./components/layouts/DashboardLayout";
import { ThemeProvider } from "./components/providers/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<DashboardLayout />}>
            {/* <Route index element={<Dashboard />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
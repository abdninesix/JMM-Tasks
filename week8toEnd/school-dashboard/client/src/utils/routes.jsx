import Home from "../pages/Home";
import About from "../pages/About";

import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import Profile from "../pages/profile/Profile";

import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";

import TeacherDashboard from "../pages/teacher/Dashboard";

import StudentDashboard from "../pages/student/Dashboard";

import RoleRedirect from "../components/redirects/RoleRedirect";

export const guestRoutes = [
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />,
    },
    {
        path: "/reset-password",
        element: <ResetPassword />,
    },
];

export const protectedRoutes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/dashboard",
        element: <RoleRedirect />,
    },
    {
        path: "/profile",
        element: <Profile />,
    },
];

export const adminRoutes = [
    {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
    },
    {
        path: "/admin/users",
        element: <Users />,
    },
];

export const teacherRoutes = [
    {
        path: "/teacher/dashboard",
        element: <TeacherDashboard />,
    },
];

export const studentRoutes = [
    {
        path: "/student/dashboard",
        element: <StudentDashboard />,
    },
];

export const publicRoutes = [
    {
        path: "/about",
        element: <About />,
    },
];
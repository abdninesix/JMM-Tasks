import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { loginSchema } from "../schemas/authSchema";

export default function Login() {
    const navigate = useNavigate();

    const { register, handleSubmit, setError, formState: { errors }, } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            toast.success(data.message);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/");
        },
        onError: (error) => {
            const serverErrors = error.response?.data?.errors;
            const message = error.response?.data?.message;

            if (serverErrors) {
                Object.entries(serverErrors).forEach(([field, messages]) => {
                    setError(field, { type: "server", message: messages[0] });
                });
            } else if (message) {
                toast.error(message);
            } else {
                toast.error("Something went wrong");
            }
        },
    });

    const onSubmit = (data) => {
        loginMutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-20 w-96 space-y-4 rounded bg-theme/5 px-4 py-8 shadow-lg">

            <h1 className="text-center text-3xl font-semibold text-gray-500">Welcome Back</h1>

            <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="email" className="font-semibold text-theme">Email</label>
                <input type="email" {...register("email")} placeholder="Enter your email" id="email" className="rounded bg-white p-2 outline-theme" />
                <p className="text-xs text-red-500">{errors.email?.message}</p>
            </div>

            <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between items-center">
                    <label htmlFor="password" className="font-semibold text-theme">Password</label>
                    <Link to="/forgot-password" className="text-theme hover:underline">Forgot Password?</Link>
                </div>
                <input type="password"{...register("password")} placeholder="Enter your password" id="password" className="rounded bg-white p-2 outline-theme" />
                <p className="text-xs text-red-500">{errors.password?.message}</p>
            </div>

            <p className="mt-6 text-sm">Don't have an account? <Link to="/register" className="text-theme hover:underline">Sign up</Link></p>

            <button
                disabled={loginMutation.isPending}
                type="submit"
                className="w-full cursor-pointer rounded bg-theme px-4 py-2 font-semibold text-white duration-100 hover:bg-theme/80 active:scale-90"
            >
                {loginMutation.isPending ? "Signing In" : "Sign In"}
            </button>

        </form>
    );
}
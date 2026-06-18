import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { registerSchema } from "../../schemas/authSchema";

export default function Register() {
    const navigate = useNavigate();

    const { register, handleSubmit, setError, formState: { errors }, } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            toast.success(data.message);
            navigate("/login")
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
            // if (serverErrors) {
            //     const messages = Object.values(serverErrors).flat().forEach(message => toast.error(message));
            // } else {
            //     toast.error(error.message);
            // }
        },
    });

    const onSubmit = (data) => {
        registerMutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-96 space-y-4 rounded bg-theme/5 px-4 py-8 shadow-lg">

            <h1 className="text-center text-3xl font-semibold text-gray-500">Create New Account</h1>

            <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="username" className="font-semibold text-theme">Username</label>
                <input {...register("username")} placeholder="Enter username" id="username" className="rounded bg-white p-2 outline-theme" />
                <p className="text-xs text-red-500">{errors.username?.message}</p>
            </div>

            <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="full_name" className="font-semibold text-theme">Full Name</label>
                <input {...register("full_name")} placeholder="Enter full name" id="full_name" className="rounded bg-white p-2 outline-theme" />
                <p className="text-xs text-red-500">{errors.full_name?.message}</p>
            </div>

            <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="email" className="font-semibold text-theme">Email</label>
                <input type="email" {...register("email")} placeholder="Enter full name" id="email" className="rounded bg-white p-2 outline-theme" />
                <p className="text-xs text-red-500">{errors.email?.message}</p>
            </div>

            <div className="flex gap-4">
                <div className="w-full flex flex-col gap-2 text-sm">
                    <label htmlFor="dob" className="font-semibold text-theme">Date of birth</label>
                    <input type="date" {...register("dob")} placeholder="Enter full name" id="dob" className="rounded bg-white p-2 outline-theme" />
                    <p className="text-xs text-red-500">{errors.dob?.message}</p>
                </div>
                <div className="w-full flex flex-col gap-2 text-sm">
                    <label htmlFor="gender" className="font-semibold text-theme">Gender</label>
                    <select id="gender" {...register("gender")} className="rounded bg-white p-2 outline-theme">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <p className="text-xs text-red-500">{errors.gender?.message}</p>
                </div>
            </div>

            <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="password" className="font-semibold text-theme">Password</label>
                <input type="password" {...register("password")} placeholder="Enter full name" id="password" className="rounded bg-white p-2 outline-theme" />
                <p className="text-xs text-red-500">{errors.password?.message}</p>
            </div>

            <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="confirm_password" className="font-semibold text-theme">Confirm Password</label>
                <input type="password" {...register("confirm_password")} placeholder="Enter full name" id="confirm_password" className="rounded bg-white p-2 outline-theme" />
                <p className="text-xs text-red-500">{errors.confirm_password?.message}</p>
            </div>

            <p className="mt-6 text-sm">Already have an account? <Link to="/login" className="text-theme hover:underline">Sign in</Link></p>

            <button
                disabled={registerMutation.isPending}
                type="submit"
                className="cursor-pointer rounded bg-theme px-4 py-2 font-semibold text-white duration-100 hover:bg-theme/80 active:scale-90"
            >
                {registerMutation.isPending ? "Signing Up" : "Sign Up"}
            </button>

        </form>
    );
}
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/registerSchema";
import { Link } from "react-router-dom";

export default function Register() {
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-96 space-y-4 rounded bg-purple-500/5 px-4 py-8 shadow-lg">
            <h1 className="text-center text-3xl font-semibold text-gray-500">Create New Account</h1>
            <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="username" className="font-semibold text-purple-500">Username</label>
                <input {...register("username")} placeholder="Enter username" id="username" className="rounded bg-white p-2 outline-purple-500" />
                <p className="text-xs text-red-500">{errors.username?.message}</p>
            </div>
            <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="full_name" className="font-semibold text-purple-500">Full Name</label>
                <input {...register("full_name")} placeholder="Enter full name" id="full_name" className="rounded bg-white p-2 outline-purple-500" />
                <p className="text-xs text-red-500">{errors.full_name?.message}</p>
            </div>
            <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="email" className="font-semibold text-purple-500">Email</label>
                <input type="email" {...register("email")} placeholder="Enter full name" id="email" className="rounded bg-white p-2 outline-purple-500" />
                <p className="text-xs text-red-500">{errors.email?.message}</p>
            </div>
            <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="dob" className="font-semibold text-purple-500">Date of birth</label>
                <input type="date" {...register("dob")} placeholder="Enter full name" id="dob" className="rounded bg-white p-2 outline-purple-500" />
                <p className="text-xs text-red-500">{errors.dob?.message}</p>
            </div>
            <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="password" className="font-semibold text-purple-500">Password</label>
                <input type="password" {...register("password")} placeholder="Enter full name" id="password" className="rounded bg-white p-2 outline-purple-500" />
                <p className="text-xs text-red-500">{errors.password?.message}</p>
            </div>
            <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="confirm_password" className="font-semibold text-purple-500">Confirm Password</label>
                <input type="password" {...register("confirm_password")} placeholder="Enter full name" id="confirm_password" className="rounded bg-white p-2 outline-purple-500" />
                <p className="text-xs text-red-500">{errors.confirm_password?.message}</p>
            </div>
            <p className="mt-6 text-sm">Already have an account? <Link to="/login" className="text-purple-500 hover:underline">Sign in</Link></p>
            <button type="submit" className="cursor-pointer rounded bg-purple-500 px-4 py-2 font-semibold text-white duration-100 hover:bg-purple-500/80 active:scale-90">Sign up</button>
        </form>
    );
}
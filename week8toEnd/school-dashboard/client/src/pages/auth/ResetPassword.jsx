import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../../schemas/authSchema";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function ResetPassword() {
    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        resolver: zodResolver(resetPasswordSchema),
    });

    const resetMutation = useMutation({
        mutationFn: resetPassword,
        onSuccess: (data) => {
            toast.success(data.message);
            navigate("/login");
        },
        onError: (error) => {
            const serverErrors = error.response?.data?.errors;
            if (serverErrors) {
                Object.entries(serverErrors).forEach(([field, messages]) => {
                    setError(field, { type: "server", message: messages[0] });
                });
            } else {
                toast.error(error.response?.data?.message || "Invalid or expired token");
            }
        },
    });

    const onSubmit = (data) => {
        resetMutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-20 w-96 space-y-4 rounded bg-theme/5 px-4 py-8 shadow-lg">
            <h1 className="text-center text-3xl font-semibold text-gray-500">Reset Password</h1>

            <div className="flex flex-col gap-2 text-sm">
                <label className="font-semibold text-theme">Email</label>
                <input {...register("email")} placeholder="Enter email" className="rounded bg-white p-2 outline-theme" />
                <p className="text-xs text-red-500">{errors.email?.message}</p>
            </div>

            <div className="flex flex-col gap-2 text-sm">
                <label className="font-semibold text-theme">Reset Token</label>
                <input {...register("token")} placeholder="Paste token here" className="rounded bg-white p-2 outline-theme" />
                <p className="text-xs text-red-500">{errors.token?.message}</p>
            </div>

            <div className="flex flex-col gap-2 text-sm">
                <label className="font-semibold text-theme">New Password</label>
                <input type="password" {...register("password")} className="rounded bg-white p-2 outline-theme" />
                <p className="text-xs text-red-500">{errors.password?.message}</p>
            </div>

            <div className="flex flex-col gap-2 text-sm">
                <label className="font-semibold text-theme">Confirm New Password</label>
                <input type="password" {...register("password_confirmation")} className="rounded bg-white p-2 outline-theme" />
                <p className="text-xs text-red-500">{errors.password_confirmation?.message}</p>
            </div>

            <button
                disabled={resetMutation.isPending}
                type="submit"
                className="w-full cursor-pointer rounded bg-theme px-4 py-2 font-semibold text-white duration-100 hover:bg-theme/80 active:scale-90"
            >
                {resetMutation.isPending ? "Resetting" : "Reset Password"}
            </button>
        </form>
    );
}
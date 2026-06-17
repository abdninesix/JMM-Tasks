import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "../schemas/authSchema";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const forgotMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/reset-password");
    },
    onError: (error) => {
      const serverErrors = error.response?.data?.errors;
      if (serverErrors) {
        Object.entries(serverErrors).forEach(([field, messages]) => {
          setError(field, { type: "server", message: messages[0] });
        });
      } else {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    },
  });

  const onSubmit = (data) => {
    forgotMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-20 w-96 space-y-4 rounded bg-theme/5 px-4 py-8 shadow-lg">
      <h1 className="text-center text-3xl font-semibold text-gray-500">Forgot Password</h1>
      <p className="text-center text-sm text-gray-400">Enter your email to receive a password reset token.</p>

      <div className="flex flex-col gap-2 text-sm">
        <label htmlFor="email" className="font-semibold text-theme">Email Address</label>
        <input type="email" {...register("email")} placeholder="Enter your registered email" id="email" className="rounded bg-white p-2 outline-theme" />
        <p className="text-xs text-red-500">{errors.email?.message}</p>
      </div>

      <div className="flex flex-col gap-2">
        <button
          disabled={forgotMutation.isPending}
          type="submit"
          className="w-full cursor-pointer rounded bg-theme px-4 py-2 font-semibold text-white duration-100 hover:bg-theme/80 active:scale-90"
        >
          {forgotMutation.isPending ? "Sending" : "Send Reset Token"}
        </button>
        <Link to="/login" className="text-center text-sm text-theme hover:underline">Back to Login</Link>
      </div>
    </form>
  );
}
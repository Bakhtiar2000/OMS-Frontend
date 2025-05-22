import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import axiosSecure from "../hook/useAxios";

const ResetPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ newPassword: string; confirmPassword: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const onSubmit = async (data: any) => {
    if (data?.newPassword !== data?.confirmPassword) {
      toast.error("Password did not Match!");
      return;
    }
    if (!token) {
      toast.error("Invalid reset link.");
      return;
    }
    if (token) localStorage.setItem("token", token);

    try {
      setLoading(true);
      const res = await axiosSecure.post("/auth/reset-password", {
        newPassword: data.newPassword,
      });
      if (res.status === 200) {
        toast.success("Password changed successfully!");
        navigate("/login");
      } else {
        toast.error("Unexpected response from server.");
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(
          error.response.data?.message || "Failed to reset password."
        );
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="mt-6 text-3xl text-center font-extrabold text-gray-900">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md bg-white focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm transition-colors"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
              className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md bg-white focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm transition-colors"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded hover:bg-green-500 transition mt-6"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin mx-auto" />
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

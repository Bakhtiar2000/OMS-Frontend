import { type FormEvent, useState } from "react";
import { Mail, Lock, Loader2, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import axiosSecure from "../hook/useAxios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [forgetPassMail, setForgetPassMail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [forgotPassLoading, setForgotPassLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleEmailLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginLoading(true);
    if (!email || !password) {
      toast.error("Please fill in all fields");
      setLoginLoading(false);
      return;
    }
    const formValue = { email, password };
    try {
      const res = await axiosSecure.post("/auth/login", formValue);
      if (res.status === 200) {
        const token = res.data?.data?.accessToken;
        if (token) localStorage.setItem("token", token);
        const meRes = await axiosSecure.get("/users/me");
        const user = meRes.data.data;
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        toast.success("Logged in successfully!");
        res.data?.user?.role === "admin"
          ? navigate("/dashboard/admin-home")
          : navigate("/");
      } else toast.error("Unexpected response from server.");
    } catch (error: any) {
      toast.error(error.response.data?.message || "Something Went Wrong!");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    try {
      setForgotPassLoading(true);
      const res = await axiosSecure.post("/auth/forgot-password", {
        email: forgetPassMail,
      });
      if (res.status !== 200) toast.error("Network response was not ok");
      Swal.fire("Please check your mail!");
      setIsOpen(false);
    } catch (error: any) {
      if (error.response) {
        toast.error(
          error.response.data?.message || "Invalid username or password"
        );
      } else {
        toast.error("Failed to login. Please try again.");
      }
    } finally {
      setForgotPassLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 ">
            Welcome back to Shoppo
          </h2>
          <p className="mt-2 text-sm text-gray-600 ">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-green-500 hover:text-green-500"
            >
              Register here
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleEmailLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center ">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500text-gray-900 rounded-md bg-white focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm transition-colors"
                  placeholder="Email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md bg-white focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm transition-colors"
                  placeholder="Password"
                />
              </div>
            </div>
            <p
              onClick={() => setIsOpen(true)}
              className="text-xs text-right hover:text-green-500 cursor-pointer duration-300"
            >
              Forgot Password?
            </p>
          </div>

          <div>
            <button
              type="submit"
              disabled={loginLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-green-500 duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loginLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-dark bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Please provide your mail
            </h2>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center ">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={forgetPassMail}
                  onChange={(e) => setForgetPassMail(e.target.value)}
                  className="relative block w-full px-3 py-2 pl-10 border placeholder-gray-500 text-gray-900 rounded-md bg-white focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm transition-colors"
                  placeholder="Email address"
                />
              </div>
            </div>
            <button
              disabled={forgotPassLoading}
              onClick={handleForgotPassword}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-green-500 bg-green-500 duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors mt-5"
            >
              {forgotPassLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Send Mail"
              )}
            </button>
            <button
              className="text-red-500 absolute top-2 right-2 hover:text-gray-900 "
              onClick={() => setIsOpen(false)}
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;

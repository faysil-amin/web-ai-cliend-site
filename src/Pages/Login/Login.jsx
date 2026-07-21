import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../Auth/useAuth";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiSparkles, HiOutlineEnvelope, HiOutlineLockClosed } from "react-icons/hi2";
import Container from "../../Component/Container/Container";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const { UserSignin } = useAuth();

  const handleFrom = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setError("");

    UserSignin(email, password)
      .then(() => {
        navigate(location.state || "/");
        Swal.fire({
          title: "Welcome Back!",
          text: "Login Successful",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        setError(err.message);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: err.message,
          confirmButtonColor: "#ef4444",
        });
      });
  };

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <Container>
      <div className="min-h-[85vh] flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-md bg-base-100/70 backdrop-blur-2xl border border-base-200/80 rounded-3xl shadow-2xl shadow-red-500/5 p-8 relative overflow-hidden transition-all duration-300">

          {/* Subtle Background Glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-red-500/20 to-yellow-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-amber-500/20 to-red-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Header & Logo */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 via-red-500 to-yellow-400 flex items-center justify-center text-white shadow-lg shadow-red-500/30 mb-3">
              <HiSparkles className="text-2xl text-yellow-100" />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-base-content">
              Welcome Back to <span className="bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">WEB AI</span>
            </h2>
            <p className="text-xs text-base-content/60 font-medium mt-1">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleFrom} className="flex flex-col gap-4">

            {/* Email Field */}
            <div className="form-control">
              <label className="label text-xs font-bold text-base-content/70 pb-1">
                Email Address
              </label>
              <div className="relative flex items-center">
                <HiOutlineEnvelope className="absolute left-3.5 text-base-content/40 text-lg" />
                <input
                  type="email"
                  name="email"
                  required
                  className="input input-bordered w-full pl-10 rounded-2xl bg-base-200/50 focus:outline-none focus:border-red-500 text-sm transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label text-xs font-bold text-base-content/70 pb-1">
                Password
              </label>
              <div className="relative flex items-center">
                <HiOutlineLockClosed className="absolute left-3.5 text-base-content/40 text-lg" />
                <input
                  name="password"
                  type={show ? "text" : "password"}
                  required
                  className="input input-bordered w-full pl-10 pr-10 rounded-2xl bg-base-200/50 focus:outline-none focus:border-red-500 text-sm transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={handleShow}
                  className="absolute right-3.5 text-base-content/50 hover:text-base-content transition-colors"
                >
                  {show ? <FaEyeSlash className="text-base" /> : <FaEye className="text-base" />}
                </button>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <p className="text-xs font-semibold text-error text-center mt-1">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 hover:opacity-95 text-white font-bold rounded-2xl border-none shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-200 mt-2 active:scale-95"
            >
              Sign In
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-6 pt-6 border-t border-base-200/80 text-center">
            <p className="text-xs font-medium text-base-content/70">
              Don't have an account?{" "}
              <Link
                to={"/register"}
                className="font-bold text-red-500 hover:text-amber-500 hover:underline transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
import React, { useContext, useState } from "react";
import Container from "../../Component/Container/Container";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Component/Context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  HiSparkles,
  HiOutlineUser,
  HiOutlinePhoto,
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineCloudArrowUp,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

// Environment Variable থেকে ImgBB API Key নিন
const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

const Register = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { creatUser } = useContext(AuthContext);
  const [error, setError] = useState("");

  // Image Upload State Management
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // ImgBB Upload Handler Logic
  const uploadImageToImgBB = async (file) => {
    if (!file) return;

    if (!IMGBB_API_KEY) {
      setError("ImgBB API Key is missing. Please check your .env file.");
      return;
    }

    // Image file validation
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file (PNG, JPG, JPEG, WEBP).");
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        setImageUrl(data.data.url);
      } else {
        setError("Failed to upload image. Try again.");
      }
    } catch (err) {
      setError("Network error while uploading image.");
    } finally {
      setUploading(false);
    }
  };

  // Handle Drag & Drop Events
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      uploadImageToImgBB(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImageToImgBB(file);
    }
  };

  const handleFrom = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    // ম্যানুয়াল ইনপুট দিলে বা আপলোড করা থাকলে সেখান থেকে ফটো ইউআরএল নেবে
    const photo = imageUrl || e.target.url.value;
    const password = e.target.password.value;

    const passwordLengthCheck = /^.{6,}$/;
    const passwordCaseCheck = /^(?=.*[a-z])(?=.*[A-Z]).+$/;

    if (!passwordLengthCheck.test(password)) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!passwordCaseCheck.test(password)) {
      setError("Password must contain both uppercase and lowercase letters.");
      return;
    }

    setError("");

    creatUser(email, password)
      .then((res) => {
        if (res?.user) {
          res.user.displayName = name;
          res.user.photoURL = photo;
        }

        Swal.fire({
          title: "Registration Successful!",
          text: "Your account has been created successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: err.message,
          confirmButtonColor: "#ef4444",
        });
      });
  };

  return (
    <Container>
      <div className="min-h-[85vh] flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-md bg-base-100/70 backdrop-blur-2xl border border-base-200/80 rounded-3xl shadow-2xl shadow-red-500/5 p-8 relative overflow-hidden transition-all duration-300">

          {/* Subtle Background Glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-red-500/20 to-yellow-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-amber-500/20 to-red-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 via-red-500 to-yellow-400 flex items-center justify-center text-white shadow-lg shadow-red-500/30 mb-3">
              <HiSparkles className="text-2xl text-yellow-100" />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-base-content">
              Create an Account on{" "}
              <span className="bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                WEB AI
              </span>
            </h2>
            <p className="text-xs text-base-content/60 font-medium mt-1">
              Join us today and explore powerful AI models
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleFrom} className="flex flex-col gap-3.5">

            {/* Full Name */}
            <div className="form-control">
              <label className="label text-xs font-bold text-base-content/70 pb-1">
                Full Name
              </label>
              <div className="relative flex items-center">
                <HiOutlineUser className="absolute left-3.5 text-base-content/40 text-lg" />
                <input
                  type="text"
                  name="name"
                  required
                  className="input input-bordered w-full pl-10 rounded-2xl bg-base-200/50 focus:outline-none focus:border-red-500 text-sm transition-all"
                  placeholder="Your Name"
                />
              </div>
            </div>

            {/* Profile Picture (Drag & Drop + Input Combo) */}
            <div className="form-control">
              <label className="label text-xs font-bold text-base-content/70 pb-1">
                Profile Photo
              </label>

              {/* Drag & Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all duration-200 relative flex flex-col items-center justify-center ${isDragging
                  ? "border-red-500 bg-red-500/10"
                  : "border-base-300 hover:border-red-400 bg-base-200/30"
                  }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                {uploading ? (
                  <div className="flex items-center gap-2 py-2">
                    <span className="loading loading-spinner loading-sm text-red-500"></span>
                    <span className="text-xs font-medium text-base-content/70">
                      Uploading to ImgBB...
                    </span>
                  </div>
                ) : imageUrl ? (
                  <div className="flex items-center gap-3 py-1 z-0">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-red-500"
                    />
                    <div className="text-left">
                      <p className="text-xs font-bold text-success flex items-center gap-1">
                        <HiOutlineCheckCircle /> Uploaded Successfully
                      </p>
                      <p className="text-[10px] text-base-content/50">
                        Click or drop to replace
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1 text-base-content/60 z-0">
                    <HiOutlineCloudArrowUp className="text-2xl text-red-500" />
                    <p className="text-xs font-medium">
                      Drag & Drop image here, or <span className="text-red-500 underline">Browse</span>
                    </p>
                    <p className="text-[10px] text-base-content/40">
                      Supports PNG, JPG, JPEG, WEBP
                    </p>
                  </div>
                )}
              </div>

              {/* Alternative Manual URL Input */}
              <div className="relative flex items-center mt-2">
                <HiOutlinePhoto className="absolute left-3.5 text-base-content/40 text-lg" />
                <input
                  type="text"
                  name="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="input input-bordered w-full pl-10 rounded-2xl bg-base-200/50 focus:outline-none focus:border-red-500 text-xs transition-all"
                  placeholder="Or paste image URL directly"
                />
              </div>
            </div>

            {/* Email Address */}
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

            {/* Password */}
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
                  onClick={() => setShow(!show)}
                  className="absolute right-3.5 text-base-content/50 hover:text-base-content transition-colors"
                >
                  {show ? <FaEyeSlash className="text-base" /> : <FaEye className="text-base" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-xs font-semibold text-error text-center mt-1">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={uploading}
              className="btn bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 hover:opacity-95 text-white font-bold rounded-2xl border-none shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-200 mt-2 active:scale-95 disabled:opacity-50"
            >
              {uploading ? "Uploading Image..." : "Create Account"}
            </button>
          </form>

          {/* Bottom Login Link */}
          <div className="mt-6 pt-5 border-t border-base-200/80 text-center">
            <p className="text-xs font-medium text-base-content/70">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-bold text-red-500 hover:text-amber-500 hover:underline transition-colors"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Register;
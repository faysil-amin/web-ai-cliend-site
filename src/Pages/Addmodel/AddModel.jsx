import React from "react";
import useAuth from "../Auth/useAuth";
import Container from "../../Component/Container/Container";
import dayjs from "dayjs";
import useAxios from "../Auth/useAxios/useAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import {
  HiOutlinePlusCircle,
  HiOutlineCpuChip,
  HiOutlineEnvelope,
  HiOutlinePhoto,
  HiOutlineDocumentText,
  HiSparkles,
} from "react-icons/hi2";

const AddModel = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axios = useAxios();

  const handleForm = (e) => {
    e.preventDefault();
    const createdAt = dayjs().toISOString();
    const name = e.target.name.value;
    const description = e.target.text.value;
    const image = e.target.url.value;
    const createdBy = e.target.email.value;
    const userObj = { name, description, image, createdBy, createdAt };

    axios
      .post("/add-model", userObj)
      .then(() => {
        navigate("/allmodels");
        Swal.fire({
          title: "Added successfully!",
          icon: "success",
          draggable: true,
        });
        e.target.reset();
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong",
          icon: "error",
        });
      });
  };

  return (
    <div className="py-10 min-h-[85vh] flex items-center justify-center">
      <Container>
        <div className="max-w-xl mx-auto bg-base-100/70 backdrop-blur-2xl border border-base-200/80 rounded-3xl shadow-2xl shadow-red-500/5 p-6 sm:p-8 relative overflow-hidden transition-all duration-300">

          {/* Background Glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-red-500/20 to-yellow-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-amber-500/20 to-red-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 via-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-lg shadow-red-500/30 mb-3">
              <HiSparkles className="text-2xl text-yellow-100" />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-base-content">
              Add New{" "}
              <span className="bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                AI Model
              </span>
            </h2>
            <p className="text-xs text-base-content/60 font-medium mt-1">
              Provide details to publish a new AI model
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleForm} className="space-y-4">

            {/* Grid 1: Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="form-control">
                <label className="label text-xs font-bold text-base-content/70 pb-1">
                  Model Name
                </label>
                <div className="relative flex items-center">
                  <HiOutlineCpuChip className="absolute left-3.5 text-base-content/40 text-lg" />
                  <input
                    type="text"
                    name="name"
                    required
                    className="input input-bordered w-full pl-10 rounded-2xl bg-base-200/50 focus:outline-none focus:border-red-500 text-sm transition-all"
                    placeholder="AI Model Name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label text-xs font-bold text-base-content/70 pb-1">
                  Email
                </label>
                <div className="relative flex items-center">
                  <HiOutlineEnvelope className="absolute left-3.5 text-base-content/40 text-lg" />
                  <input
                    type="email"
                    name="email"
                    defaultValue={user?.email}
                    readOnly
                    className="input input-bordered w-full pl-10 rounded-2xl bg-base-200/50 text-xs font-medium cursor-not-allowed opacity-80"
                  />
                </div>
              </div>
            </div>

            {/* Image URL */}
            <div className="form-control">
              <label className="label text-xs font-bold text-base-content/70 pb-1">
                Image URL
              </label>
              <div className="relative flex items-center">
                <HiOutlinePhoto className="absolute left-3.5 text-base-content/40 text-lg" />
                <input
                  type="text"
                  name="url"
                  required
                  className="input input-bordered w-full pl-10 rounded-2xl bg-base-200/50 focus:outline-none focus:border-red-500 text-sm transition-all"
                  placeholder="https://example.com/image.png"
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label text-xs font-bold text-base-content/70 pb-1">
                Description
              </label>
              <div className="relative flex items-start">
                <HiOutlineDocumentText className="absolute left-3.5 top-3.5 text-base-content/40 text-lg" />
                <textarea
                  name="text"
                  required
                  className="textarea textarea-bordered w-full pl-10 rounded-2xl bg-base-200/50 focus:outline-none focus:border-red-500 text-sm leading-relaxed h-28 transition-all"
                  placeholder="Describe your model..."
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 hover:opacity-95 text-white font-extrabold rounded-2xl border-none shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-200 mt-2 active:scale-95"
            >
              <HiOutlinePlusCircle className="text-lg" /> Add AI Model
            </button>
          </form>

        </div>
      </Container>
    </div>
  );
};

export default AddModel;
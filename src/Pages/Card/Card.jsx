import React, { useRef } from "react";
import useAuth from "../Auth/useAuth";
import { MdDeleteOutline } from "react-icons/md";
import useAxios from "../Auth/useAxios/useAxios";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { FaRegEdit } from "react-icons/fa";
import { BsThreeDotsVertical, BsArrowRightShort } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi2";

const Card = ({ res, data, setData }) => {
  const editRef = useRef();
  const { user } = useAuth();
  const { _id, name, framework, description, createdBy, image } = res;
  const axios = useAxios();

  // Optimized Delete with Correct Swal Flow
  const handleDelet = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      background: "#1f2937",
      color: "#fff",
      customClass: {
        popup: "rounded-3xl border border-gray-700",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/add-model/${id}`).then(() => {
          const deleteData = data.filter((item) => item._id !== id);
          setData(deleteData);
          Swal.fire({
            title: "Deleted!",
            text: "Your model has been removed.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        });
      }
    });
  };

  const handleModerm = () => {
    editRef.current.showModal();
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const newName = e.target.name.value;
    const obj = { name: newName };

    axios.patch(`/edit/${_id}`, obj).then((res) => {
      if (res.status) {
        const newData = data.map((item) =>
          item._id === _id ? { ...item, name: newName } : item
        );

        setData(newData);
        editRef.current.close();
        Swal.fire({
          title: "Updated Successfully!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
    e.target.reset();
  };

  return (
    <div className="group relative bg-base-100/60 backdrop-blur-xl border border-base-200/80 hover:border-red-500/30 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 flex flex-col justify-between">

      {/* Upper Image & Top Action Options */}
      <div className="relative overflow-hidden bg-base-200/50 pt-[60%] sm:pt-[55%]">
        <img
          src={image}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          alt={name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-black/20 opacity-80" />

        {/* Framework Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1 text-xs font-bold tracking-wide rounded-full bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-md shadow-red-500/20 backdrop-blur-md flex items-center gap-1">
            <HiSparkles className="text-yellow-200 text-xs" />
            {framework}
          </span>
        </div>

        {/* Top Right Option Dropdown for Creator */}
        {user?.email === createdBy && (
          <div className="absolute top-3 right-3 z-10">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="w-8 h-8 rounded-full bg-base-100/70 backdrop-blur-md hover:bg-base-100 text-base-content flex items-center justify-center shadow-md transition-all active:scale-90"
              >
                <BsThreeDotsVertical className="text-sm" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100/95 backdrop-blur-2xl rounded-2xl z-[10] w-40 p-2 shadow-xl border border-base-200/80 mt-2 gap-1"
              >
                <li>
                  <button
                    onClick={handleModerm}
                    className="flex items-center gap-2 text-xs font-semibold py-2 px-3 rounded-xl hover:bg-base-200"
                  >
                    <FaRegEdit className="text-amber-500 text-sm" />
                    <span>Edit Model</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleDelet(_id)}
                    className="flex items-center gap-2 text-xs font-semibold text-error py-2 px-3 rounded-xl hover:bg-error/10"
                  >
                    <MdDeleteOutline className="text-base" />
                    <span>Delete</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex flex-col flex-grow justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-base-content group-hover:text-red-500 transition-colors line-clamp-1">
            {name}
          </h2>
          <p className="text-xs md:text-sm text-base-content/70 mt-2 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-base-200/60 flex items-center justify-between gap-2">
          <Link to={`/aboutai/${_id}`} className="flex-1">
            <button className="w-full btn btn-sm md:btn-md bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 hover:opacity-95 text-white font-bold rounded-xl border-none shadow-md shadow-red-500/20 text-xs md:text-sm flex items-center justify-center gap-1 group/btn">
              <span>About AI</span>
              <BsArrowRightShort className="text-lg group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </Link>

          <button className="btn btn-sm md:btn-md btn-ghost hover:bg-base-200/80 font-bold rounded-xl text-xs md:text-sm border border-base-200">
            Start
          </button>
        </div>
      </div>

      {/* Edit Model Popup */}
      <dialog ref={editRef} className="modal backdrop-blur-sm">
        <div className="modal-box bg-base-100/95 border border-base-200 rounded-3xl p-6 shadow-2xl max-w-md">
          <div className="flex items-center justify-between pb-4 border-b border-base-200">
            <h3 className="font-bold text-lg flex items-center gap-2 text-base-content">
              <FaRegEdit className="text-amber-500" /> Update Model Name
            </h3>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost text-base-content/60 hover:text-base-content">
                ✕
              </button>
            </form>
          </div>

          <form onSubmit={handleEdit} className="mt-4 flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-base-content/70 mb-1.5 block">
                New Model Name
              </label>
              <input
                name="name"
                defaultValue={name}
                required
                type="text"
                className="input input-bordered w-full rounded-xl bg-base-200/50 focus:outline-none focus:border-red-500 text-sm"
                placeholder="Enter new model name"
              />
            </div>

            <div className="flex items-center justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => editRef.current.close()}
                className="btn btn-sm rounded-xl btn-ghost"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-sm rounded-xl bg-gradient-to-r from-red-600 to-amber-500 text-white border-none shadow-md"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Card;
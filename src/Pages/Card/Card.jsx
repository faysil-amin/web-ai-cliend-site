import React, { useRef } from "react";
import useAuth from "../Auth/useAuth";
import { MdDeleteOutline } from "react-icons/md";
import useAxios from "../Auth/useAxios/useAxios";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { FaRegEdit } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
const Card = ({ res, data, setData }) => {
  const editRef = useRef();
  const { user } = useAuth();
  const { _id, name, framework, description, createdBy, image } = res;
  const axios = useAxios();
  // delete
  const handleDelet = (id) => {
    axios.delete(`/add-model/${id}`).then((res) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const deleteData = data.filter((res) => res._id !== id);
          setData(deleteData);
        }
      });
    });
  };
  const handleModerm = () => {
    editRef.current.showModal();
  };
  const handleEdit = (e) => {
    const name = e.target.name.value;
    const obj = { name };
    axios.patch(`/edit/${_id}`, obj).then((res) => {
      if (res.status) {
        const newData = data.map((item) =>
          item._id === _id ? { ...item, name } : item,
        );

        setData(newData);
        editRef.current.close();
        Swal.fire({
          title: "Drag me!",
          icon: "success",
          draggable: true,
        });
      }
    });
    e.target.reset();
  };
  return (
    <div className="card border hover:scale-105 transition duration-300 ease-in-out relative">
      <div>
        <img src={image} className="max-h-60 p-2 w-full" alt="" />
      </div>
      <div className="card-body items-center text-center">
        <div className="flex items-center gap-3">
          <h2 className="card-title">{name}</h2>
          <h2 className="card-title border border-white px-3 rounded-xl">
            {framework}
          </h2>
        </div>
        <p>{description}</p>
        <div className="card-actions items-center justify-center md:justify-end">
          <Link to={`/aboutai/${_id}`}>
            <button className="btn btn-primary">About AI Models</button>
          </Link>
          <button className="btn btn-ghost">Get Start</button>
          {user?.email === createdBy ? (
            <button
              onClick={() => handleDelet(_id)}
              className="text-2xl text-red-500"
            >
              <MdDeleteOutline />
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* edit button */}
      {user?.email === createdBy ? (
        <div className=" mt-6">
          <div className="dropdown dropdown-left absolute right-0 bottom-0 ">
            <div tabIndex={0} role="button" className="btn m-1">
              <BsThreeDotsVertical />
            </div>
            <ul
              tabIndex="-1"
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li onClick={() => handleModerm()}>
                <p>
                  {" "}
                  <FaRegEdit /> Edit
                </p>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
      <div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}

        <dialog ref={editRef} className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>

            <form onSubmit={handleEdit}>
              <div className="card-body">
                <fieldset className="fieldset">
                  <label className="label">New Name</label>
                  <input
                    name="name"
                    required
                    type="text"
                    className="input w-full"
                    placeholder="New Web Name"
                  />

                  <button className="btn btn-neutral mt-4">submit</button>
                </fieldset>
              </div>
            </form>
          </div>
        </dialog>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
    </div>
  );
};

export default Card;

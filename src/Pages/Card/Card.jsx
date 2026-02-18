import React from "react";
import useAuth from "../Auth/useAuth";
import { MdDeleteOutline } from "react-icons/md";
import useAxios from "../Auth/useAxios/useAxios";
import Swal from "sweetalert2";
import { Link } from "react-router";
const Card = ({ res, data, setData }) => {
  const { user } = useAuth();
  const { _id, name, framework, description, createdBy } = res;
  const axios = useAxios();
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
  return (
    <div className="card border">
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
    </div>
  );
};

export default Card;

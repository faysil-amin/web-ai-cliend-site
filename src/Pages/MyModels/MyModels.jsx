import React, { use, useEffect, useState } from "react";
import useAxios from "../Auth/useAxios/useAxios";
import useAuth from "../Auth/useAuth";
import Loader from "../Loader/Loader";
import Container from "../../Component/Container/Container";
import MyModelsCard from "../MyModelsCard/MyModelsCard";
import { HiOutlineCpuChip, HiOutlineCube, HiOutlinePlus } from "react-icons/hi2";
import { Link } from "react-router";

const MyModels = () => {
  const [data, setData] = useState([]);
  const axios = useAxios();
  const { user } = useAuth();
  const [loader, setLoader] = useState(true);
  console.log(data);

  useEffect(() => {
    axios.get(`/mymodel/?email=${user?.email}`).then((res) => {
      setData(res.data);
      setLoader(false);
    });
  }, [axios, user]);

  return (
    <div className="py-8 min-h-[85vh]">
      <Container>
        {/* Page Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-base-100/60 backdrop-blur-xl border border-base-200/80 p-6 rounded-3xl shadow-xl shadow-red-500/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 via-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-lg shadow-red-500/20 shrink-0">
              <HiOutlineCpuChip className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-base-content tracking-tight">
                My AI <span className="bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">Models</span>
              </h1>
              <p className="text-xs text-base-content/60 font-medium mt-0.5">
                Manage and view all your created or saved AI models
              </p>
            </div>
          </div>

          {/* Model Count Badge */}
          <div className="flex items-center gap-2 self-start sm:self-auto bg-base-200/60 px-4 py-2 rounded-2xl border border-base-300/50">
            <HiOutlineCube className="text-red-500 text-lg" />
            <span className="text-xs font-bold text-base-content">
              Total Models: <span className="text-red-500 font-extrabold">{data.length}</span>
            </span>
          </div>
        </div>

        {/* Content Area */}
        {loader ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <Loader />
          </div>
        ) : data.length === 0 ? (
          /* Empty State View */
          <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-base-100/40 border border-dashed border-base-300 rounded-3xl backdrop-blur-md">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-4">
              <HiOutlineCube className="text-3xl" />
            </div>
            <h3 className="text-lg font-bold text-base-content">No Models Found</h3>
            <p className="text-xs text-base-content/60 max-w-sm mt-1 mb-6">
              You haven't added any AI models yet. Start creating or uploading your first model!
            </p>
            <Link
              to="/add-model"
              className="btn bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 hover:opacity-95 text-white font-bold rounded-2xl border-none shadow-lg shadow-red-500/20 text-xs px-6"
            >
              <HiOutlinePlus className="text-base" /> Add New Model
            </Link>
          </div>
        ) : (
          /* Models Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((res) => (
              <MyModelsCard key={res._id || res.id} res={res} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default MyModels;
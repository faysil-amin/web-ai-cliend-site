import React, { useEffect, useState } from "react";
import useAxios from "../Auth/useAxios/useAxios";
import Container from "../../Component/Container/Container";
import MyPurchasesCard from "./MyPurchasesCard";
import { FiShoppingBag, FiPackage } from "react-icons/fi";

const MyPurchases = () => {
  const [data, setData] = useState([]);
  const axios = useAxios();

  useEffect(() => {
    axios.get("/purchases").then((res) => {
      setData(res.data);
    });
  }, [axios]);

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <Container>
        {/* Header Section with Red-to-Yellow Gradient */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <div className="p-3 bg-gradient-to-r from-red-500 to-amber-500 text-white rounded-xl shadow-md">
              <FiShoppingBag className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">
                My Purchases
              </h1>
              <p className="text-sm text-gray-500">Manage and view your order history</p>
            </div>
          </div>

          {/* Badge Count */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-red-500/10 to-amber-500/10 border border-red-200 px-4 py-2 rounded-full">
            <span className="text-sm font-semibold text-gray-700">Total Items:</span>
            <span className="text-lg font-bold bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
              {data.length}
            </span>
          </div>
        </div>

        {/* Content Section */}
        {data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((res, index) => (
              <MyPurchasesCard key={res._id || index} res={res} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
            <FiPackage className="text-5xl text-gray-400 mb-3" />
            <p className="text-lg font-medium text-gray-600">No purchases found yet!</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default MyPurchases;
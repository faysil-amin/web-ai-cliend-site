import React from "react";
import useAuth from "../Auth/useAuth";
import { FiUser, FiCode, FiMail, FiCalendar } from "react-icons/fi";

const MyPurchasesCard = ({ res }) => {
  const { user } = useAuth();
  const { _id, name, description, image, createdBy, createdAt, framework } = res || {};

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col justify-between group hover:-translate-y-1 relative">

      {/* Top Gradient Border Line */}
      <div className="h-1.5 bg-gradient-to-r from-red-500 via-amber-500 to-yellow-400 w-full" />

      <div className="p-5">
        {/* Top Header: Image & Main Info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <img
              className="w-20 h-20 object-cover rounded-xl border border-gray-100 shadow-inner group-hover:scale-105 transition-transform duration-300"
              src={image}
              alt={name || "Purchase Item"}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-red-600 transition-colors">
              {name}
            </h3>

            {/* Framework Badge */}
            {framework && (
              <span className="inline-flex items-center gap-1 mt-2 text-xs font-semibold px-2.5 py-1 rounded-md bg-gradient-to-r from-red-500/10 to-amber-500/10 text-red-600 border border-red-200/60">
                <FiCode className="text-sm" />
                {framework}
              </span>
            )}
          </div>
        </div>

        {/* Description (if present) */}
        {description && (
          <p className="text-xs text-gray-500 line-clamp-2 mb-4 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
            {description}
          </p>
        )}

        {/* Metadata Details */}
        <div className="space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-3">
          <div className="flex items-center gap-2">
            <FiUser className="text-amber-500 shrink-0 text-sm" />
            <span className="font-semibold text-gray-700">Creator:</span>
            <span className="truncate text-gray-600">{createdBy || "N/A"}</span>
          </div>

          <div className="flex items-center gap-2">
            <FiMail className="text-red-500 shrink-0 text-sm" />
            <span className="font-semibold text-gray-700">Purchased by:</span>
            <span className="truncate font-medium text-gray-800 bg-gray-100 px-2 py-0.5 rounded">
              {user?.email}
            </span>
          </div>

          {createdAt && (
            <div className="flex items-center gap-2 text-gray-400 pt-1">
              <FiCalendar className="shrink-0 text-sm" />
              <span>{new Date(createdAt).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPurchasesCard;
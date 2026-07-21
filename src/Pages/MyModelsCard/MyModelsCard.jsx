import React from "react";
import { Link } from "react-router";
import {
  HiOutlineTrash,
  HiOutlineCalendar,
  HiOutlineUser,
} from "react-icons/hi2";

const MyModelsCard = ({ res, handleDelete }) => {
  const { _id, name, description, image, createdBy, createdAt } = res || {};

  // তারিখ ফরম্যাট করার সহজ ফাংশন
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    : null;

  return (
    <div className="w-full bg-base-100/60 backdrop-blur-xl border border-base-200/80 hover:border-red-500/40 rounded-3xl p-4 shadow-xl shadow-red-500/5 hover:shadow-red-500/10 transition-all duration-300 my-3 group relative">
      <div className="flex flex-col sm:flex-row items-center gap-4">

        {/* Model Image (Clickable Link to Details) */}
        <Link to={`/model/${_id}`} className="w-full sm:w-28 h-28 rounded-2xl overflow-hidden bg-base-200 shrink-0 relative block">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            src={image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop"}
            alt={name || "Model Image"}
          />
        </Link>

        {/* Model Details */}
        <div className="flex-1 min-w-0 text-center sm:text-left w-full">
          <Link to={`/model/${_id}`}>
            <h3 className="text-lg font-black text-base-content hover:text-red-500 transition-colors truncate">
              {name || "Untitled Model"}
            </h3>
          </Link>

          {/* Description */}
          {description && (
            <p className="text-xs text-base-content/60 line-clamp-2 mt-1 leading-relaxed">
              {description}
            </p>
          )}

          {/* Meta Info (Created By & Date) */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-2 text-[11px] font-semibold text-base-content/50">
            {createdBy && (
              <span className="flex items-center gap-1">
                <HiOutlineUser className="text-red-500" />
                {createdBy}
              </span>
            )}
            {formattedDate && (
              <span className="flex items-center gap-1">
                <HiOutlineCalendar className="text-amber-500" />
                {formattedDate}
              </span>
            )}
          </div>
        </div>

        {/* Action Button (Only Delete) */}
        {handleDelete && (
          <div className="flex items-center justify-end w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-base-200/60 shrink-0">
            <button
              onClick={() => handleDelete(_id)}
              className="btn btn-sm btn-square btn-ghost text-base-content/70 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
              title="Delete Model"
            >
              <HiOutlineTrash className="text-lg" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default MyModelsCard;
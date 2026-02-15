import React from "react";

const Card = ({ res }) => {
  const { _id, name, framework, description } = res;
  return (
    <div className="card  border">
      <div className="card-body items-center text-center">
        <div className="flex items-center gap-3">
          <h2 className="card-title">{name}</h2>
          <h2 className="card-title border border-white px-3 rounded-xl">
            {framework}
          </h2>
        </div>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">About AI Models</button>
          <button className="btn btn-ghost">Get Start</button>
        </div>
      </div>
    </div>
  );
};

export default Card;

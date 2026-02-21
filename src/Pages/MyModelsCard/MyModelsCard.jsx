import React from "react";
import Container from "../../Component/Container/Container";
import useAuth from "../Auth/useAuth";

const MyModelsCard = ({ res }) => {
  const { _id, name, description, image, createdBy, createdAt } = res;
  return (
    <div>
      <Container>
        <div className="w-full shadow-sm flex items-center rounded-lg mt-2">
          <div className="p-4">
            <img className="w-20 h-20" src={image} alt="" />
          </div>
          <div className="ml-4">
            <p className="font-bold text-left">{name}</p>
            
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MyModelsCard;

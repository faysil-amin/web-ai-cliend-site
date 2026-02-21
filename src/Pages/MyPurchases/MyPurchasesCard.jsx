import React from "react";
import Container from "../../Component/Container/Container";
import useAuth from "../Auth/useAuth";

const MyPurchasesCard = ({ res }) => {
  const { user } = useAuth();
  const { _id, name, description, image, createdBy, createdAt, framework } =
    res;
  return (
    <div>
      <Container>
        <div className="w-full shadow-sm flex items-center rounded-lg mt-2">
          <div className="p-4">
            <img className="w-20 h-20" src={image} alt="" />
          </div>
          <div className="ml-4">
            <p className="font-bold text-left">{name}</p>
            <p>
              <span className="font-bold">Framework: </span>
              {framework}
            </p>
            <p>
              <span className="font-bold">Ceator: </span>
              {createdBy}
            </p>
            <p>
              <span className="font-bold">Purchased by: </span>
              <span className="text-blue-500"> {user?.email}</span>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MyPurchasesCard;

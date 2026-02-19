import React from "react";
import Container from "../../Component/Container/Container";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div>
      <Container>
        <div className="flex items-center justify-center h-screen flex-col">
          <h1 className="text-8xl font-black">
            4<span className="text-red-500">0</span>4
          </h1>
          <p className="font-bold">page not found</p>
          <Link to={"/"}>
            <button className="btn btn-warning mt-4">Home</button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default ErrorPage;

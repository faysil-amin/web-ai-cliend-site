import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Component/Navbar/Navbar";

const Root = () => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer></footer>
    </div>
  );
};

export default Root;

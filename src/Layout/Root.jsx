import React, { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Component/Footer/Footer";

const Root = () => {
  const [light, setLight] = useState(false);
  return (
    <div className={light ? `text-white bg-black` : `text-black bg-white`}>
      <header>
        <Navbar light={light} setLight={setLight}></Navbar>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Root;

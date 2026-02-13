import React, { useState } from "react";
import { Link } from "react-router";
import useAuth from "../Auth/useAuth";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const { UserSignin } = useAuth();
  const handleFrom = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    UserSignin(email, password)
      .then(() => {
        Swal.fire({
          title: "LogIn Successfull",
          icon: "success",
          draggable: true,
        });
      })
      .catch(() => {
        setError("check your email & password");
      });
  };
  const handleShow = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <form
        onSubmit={handleFrom}
        className="w-full flex items-center justify-center"
      >
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
              {/* email */}
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
              />
              {/* password */}
              <label className="label">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={show ? "text" : "password"}
                  className="input"
                  placeholder="Password"
                />
                <p
                  className="absolute right-8 top-4"
                  onClick={() => handleShow()}
                >
                  {show ? <FaEyeSlash /> : <FaEye />}
                </p>
              </div>
              <button className="btn btn-neutral mt-4">LogIn</button>
              <p>
                Creat accound{" "}
                <Link to={"/register"} className="underline text-blue-600">
                  Register
                </Link>
              </p>
              <p className="text-red-500">{error}</p>
            </fieldset>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

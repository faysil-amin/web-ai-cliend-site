import React from "react";
import { Link } from "react-router";

const Login = () => {
  return (
    <form>
      <div className="flex items-center justify-center w-full h-screen">
        <form className="w-full flex items-center justify-center">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                {/* email */}
                <label className="label">Email</label>
                <input
                  type="email"
                  name="name"
                  className="input"
                  placeholder="Email"
                />
                {/* password */}
                <label className="label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="input"
                  placeholder="Password"
                />
                <button className="btn btn-neutral mt-4">Register</button>
                <p>
                  Creat accound{" "}
                  <Link to={"/register"} className="underline text-blue-600">
                    Register
                  </Link>
                </p>
              </fieldset>
            </div>
          </div>
        </form>
      </div>
    </form>
  );
};

export default Login;

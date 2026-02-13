import React, { useContext, useState } from "react";
import Container from "../../Component/Container/Container";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Component/Context/AuthContext/AuthContext";
import Swal from "sweetalert2";
const Register = () => {
  const navigate = useNavigate();
  const { creatUser, userUpdate } = useContext(AuthContext);
  const [error, setError] = useState("");
  const handleFrom = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const url = e.target.url.value;
    const password = e.target.password.value;
    const passwordLengthCheck = /^.{6,}$/;
    const passwordCaseCheck = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
    const userObjects = {
      displayName: name,
      photoURL: url,
    };
    if (!passwordLengthCheck.test(password)) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (!passwordCaseCheck.test(password)) {
      setError("Must contain both uppercase and lowercase letters");
      return;
    }
    setError("");
    creatUser(email, password)
      .then((res) => {
        res.user.displayName = name;
        res.user.photoURL = url;
        Swal.fire({
          title: "Registration Successful",
          icon: "successYour account has been created successfully.",
          draggable: true,
        });
        navigate("/");
      })
      .catch(() => {});
  };
  return (
    <Container>
      <div className="flex items-center justify-center w-full h-screen">
        <form
          onSubmit={handleFrom}
          className="w-full flex items-center justify-center"
        >
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                {/* name */}
                <label className="label">Name</label>
                <input
                  name="name"
                  type="text"
                  className="input"
                  placeholder="Name"
                  required
                />
                {/* url */}
                <label className="label">Image Url</label>
                <input
                  name="url"
                  type="text"
                  className="input"
                  placeholder="Image URL"
                />
                {/* email */}
                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Email"
                  required
                />
                {/* password */}
                <label className="label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="input"
                  placeholder="Password"
                  required
                />
                <button className="btn btn-neutral mt-4">Register</button>
                <p>
                  I have already accound{" "}
                  <Link to={"/login"} className="underline text-blue-600">
                    Login
                  </Link>
                </p>
                <p className="text-red-500">{error}</p>
              </fieldset>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Register;

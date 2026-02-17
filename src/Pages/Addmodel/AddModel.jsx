import React from "react";
import useAuth from "../Auth/useAuth";
import Container from "../../Component/Container/Container";
import dayjs from "dayjs";
import useAxios from "../Auth/useAxios/useAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddModel = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axios = useAxios();
  const handleForm = (e) => {
    e.preventDefault();
    const createdAt = dayjs().toISOString();
    const name = e.target.name.value;
    const description = e.target.text.value;
    const image = e.target.url.value;
    const createdBy = e.target.email.value;
    const userObj = { name, description, image, createdBy, createdAt };
    axios
      .post("/add-model", userObj)
      .then(() => {
        navigate("/allmodels");
        Swal.fire({
          title: "Added successfully!",
          icon: "success",
          draggable: true,
        });
        e.target.reset();
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong",
          icon: "error",
        });
      });
  };
  return (
    <Container>
      <form onSubmit={handleForm}>
        <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl mt-15 mx-auto">
          <div className="card-body">
            <fieldset className="fieldset">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="input"
                    placeholder="AI Model Name"
                  />
                </div>

                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input"
                    defaultValue={user.email}
                    readOnly
                  />
                </div>
              </div>
              <label className="label">Image Url</label>
              <input
                type="text"
                name="url"
                className="input w-full"
                placeholder="Image URL"
              />

              <fieldset className="fieldset">
                <label className="label">Description</label>
                <textarea
                  name="text"
                  className="textarea h-24 w-full"
                  placeholder="Description"
                  required
                ></textarea>
              </fieldset>
              <button className="btn btn-neutral mt-4">Add AI Model</button>
            </fieldset>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default AddModel;

//  "_id": "698f05463bb09aee2a2a668c",
//   "name": "BERT",
//   "framework": "TensorFlow",
//   "useCase": "NLP",
//   "dataset": "Wikipedia",
//   "description": "A transformer-based model for natural language processing tasks like text classification.",
//   "image": "https://ibb.co/sample-image-bert-diagram",
//   "createdBy": "user@example.com",
//   "createdAt": "2025-10-28T11:54:00.000Z",
//   "purchased": 10

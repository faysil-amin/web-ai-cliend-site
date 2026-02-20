import React from "react";
import Container from "../../Component/Container/Container";
import ai from "../../assets/ai.jpg";
const AboutAiDetails = ({ res }) => {
  const {
    createdAt,
    createdBy,
    dataset,
    description,
    framework,
    image,
    name,
    purchased,
    _id,
    useCase,
  } = res;
  return (
    <Container>
      <div>
        <div className="card bg-base-100 mt-8 max-w-2xl mx-auto shadow-sm">
          <figure>
            <img className="w-full max-h-80 " src={image} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {name}
              <div className="badge badge-secondary">purchased:{purchased}</div>
            </h2>
            <p>
              <span className="font-bold">ID: </span> {_id}
            </p>
            <p>
              <span className="font-bold">Dataset: </span>
              {dataset}
            </p>
            <p>
              <span className="font-bold">Description: </span>
              {description}
            </p>
            <p>
              <span className="font-bold">CreatedBy: </span>
              {createdBy}
            </p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">{framework}</div>
              <div className="badge badge-outline">{useCase}</div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AboutAiDetails;
// createdAt: "2025-10-28T11:54:00.000Z";
// createdBy: "user@example.com";
// dataset: "Wikipedia";
// description: "A transformer-based model for natural language processing tasks like text classification.";
// framework: "TensorFlow";
// image: "https://ibb.co/sample-image-bert-diagram";
// name: "BERT";
// purchased: 10;
// useCase: "NLP";
// _id: "698f05463bb09aee2a2a668c";

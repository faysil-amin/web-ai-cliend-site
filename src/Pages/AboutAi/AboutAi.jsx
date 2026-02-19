import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxios from "../Auth/useAxios/useAxios";
import Loader from "../Loader/Loader";
import AboutAiDetails from "../AboutAiDetails/AboutAiDetails";

const AboutAi = () => {
  const { id } = useParams();
  const axios = useAxios();
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("/add-model").then((res) => {
      setData(res.data);
      setLoader(false);
    });
  }, [axios]);
  const filterData = data.filter((res) => res._id === id);
  return (
    <div>
      {loader ? (
        <Loader></Loader>
      ) : (
        <div>
          {filterData.map((res) => (
            <AboutAiDetails res={res}></AboutAiDetails>
          ))}
        </div>
      )}
    </div>
  );
};

export default AboutAi;

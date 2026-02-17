import React, { useEffect, useState } from "react";
import useLink from "../Auth/useLink/useLink";
import Loader from "../Loader/Loader";
import Card from "../Card/Card";

const Allmodels = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  console.log(data);

  const axios = useLink();
  useEffect(() => {
    axios.get("/add-model").then((res) => {
      setData(res.data);
      setLoader(false);
    });
  }, [axios]);
  return (
  );
};

export default Allmodels;

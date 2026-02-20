import React, { use, useEffect, useState } from "react";
import useAxios from "../Auth/useAxios/useAxios";
import useAuth from "../Auth/useAuth";
import Loader from "../Loader/Loader";
import Container from "../../Component/Container/Container";

const MyModels = () => {
  const [data, setData] = useState([]);
  const axios = useAxios();
  const { user } = useAuth();
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    axios.get(`/mymodel/?email=${user?.email}`).then((res) => {
      setData(res.data);
    });
  }, [axios, user]);
  return (
    <div>
      <Container>{loader ? <Loader></Loader> : <div>
        {data.map(res=>)}
        </div>}</Container>
    </div>
  );
};

export default MyModels;

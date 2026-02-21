import React, { use, useEffect, useState } from "react";
import useAxios from "../Auth/useAxios/useAxios";
import useAuth from "../Auth/useAuth";
import Loader from "../Loader/Loader";
import Container from "../../Component/Container/Container";
import MyModelsCard from "../MyModelsCard/MyModelsCard";

const MyModels = () => {
  const [data, setData] = useState([]);
  const axios = useAxios();
  const { user } = useAuth();
  const [loader, setLoader] = useState(true);
  console.log(data);
  useEffect(() => {
    axios.get(`/mymodel/?email=${user?.email}`).then((res) => {
      setData(res.data);
      setLoader(false);
    });
  }, [axios, user]);
  return (
    <div>
      <Container>
        {loader ? (
          <Loader></Loader>
        ) : (
          <div>
            {data.map((res) => (
              <MyModelsCard res={res}></MyModelsCard>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default MyModels;

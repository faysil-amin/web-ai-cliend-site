import React, { useEffect, useState } from "react";
import Container from "../../Component/Container/Container";
import useAxios from "../Auth/useAxios/useAxios";

const Home = () => {
  const [data, setData] = useState();
  console.log(data);
  const axios = useAxios();
  useEffect(() => {
    axios.get("/add-latest-model").then((data) => setData(data.data));
  }, [axios]);
  return (
    <Container>
      <div>home</div>
    </Container>
  );
};

export default Home;

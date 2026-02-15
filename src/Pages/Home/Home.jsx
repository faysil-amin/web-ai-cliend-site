import React, { useEffect, useState } from "react";
import Container from "../../Component/Container/Container";
import useAxios from "../Auth/useAxios/useAxios";
import Card from "../Card/Card";

const Home = () => {
  const [data, setData] = useState([]);
  console.log(data);
  const axios = useAxios();
  useEffect(() => {
    axios.get("/add-latest-model").then((data) => setData(data.data));
  }, [axios]);
  return (
    <Container>
      <div className="grid grid-cols-3 gap-2 mt-8">
        {data.map((res) => (
          <Card res={res}></Card>
        ))}
      </div>
    </Container>
  );
};

export default Home;

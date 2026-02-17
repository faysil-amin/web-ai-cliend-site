import React, { useEffect, useState } from "react";
import Container from "../../Component/Container/Container";
import Card from "../Card/Card";
import Loader from "../Loader/Loader";
import useLink from "../Auth/useLink/useLink";
const Home = () => {
  const [load, setLoad] = useState(true);
  const [data, setData] = useState([]);
  const axios = useLink();
  useEffect(() => {
    axios
      .get("/add-latest-model")
      .then((res) => {
        setData(res.data);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
        setLoad(false);
      });
  }, [axios]);

  return (
    <Container>
      <div>
        {load ? (
          <Loader></Loader>
        ) : (
          <div className="grid md:grid-cols-3 gap-2 mt-8">
            {data.map((res) => (
              <Card res={res}></Card>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Home;

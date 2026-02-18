import React, { useEffect, useState } from "react";
import useLink from "../Auth/useLink/useLink";
import Loader from "../Loader/Loader";
import Card from "../Card/Card";
import Container from "../../Component/Container/Container";

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
    <Container>
      <div>
        {loader ? (
          <Loader></Loader>
        ) : (
          <div className="grid md:grid-cols-3 gap-2 ">
            {" "}
            {data.map((res) => (
              <Card res={res} data={data} setData={setData}></Card>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Allmodels;

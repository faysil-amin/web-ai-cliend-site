import React, { useEffect, useState } from "react";
import useAxios from "../Auth/useAxios/useAxios";
import Container from "../../Component/Container/Container";
import MyPurchasesCard from "./MyPurchasesCard";

const MyPurchases = () => {
  const [data, setData] = useState([]);
  const axios = useAxios();
  useEffect(() => {
    axios.get("/purchases").then((res) => {
      setData(res.data);
    });
  }, [axios]);
  return (
    <div>
      <Container>
        <h1>
          <span className="font-bold">Length: </span>{" "}
          <span className="text-red-500 font-bold">{data.length}</span>
        </h1>
      </Container>
      {data.map((res) => (
        <MyPurchasesCard res={res}></MyPurchasesCard>
      ))}
    </div>
  );
};

export default MyPurchases;

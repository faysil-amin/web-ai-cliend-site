import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});
const useLink = () => {
  return axiosInstance;
};

export default useLink;

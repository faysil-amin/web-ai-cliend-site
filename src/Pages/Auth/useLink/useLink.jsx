import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://webai-topaz.vercel.app",
});
const useLink = () => {
  return axiosInstance;
};

export default useLink;

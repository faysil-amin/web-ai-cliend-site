import axios from "axios";
import useAuth from "../../Pages/Auth/useAuth";

const instence = axios.create({
  baseURL: "http://localhost:5173",
});
const useAxios = () => {
  const { user } = useAuth();
  instence.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${user.accessToken}`;
    return config;
  });
  return instence;
};
export default useAxios;

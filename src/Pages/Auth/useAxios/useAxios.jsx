import axios from "axios";
import useAuth from "../useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});
const useAxios = () => {
  const navigate = useNavigate();
  const { user, UserSingOut } = useAuth();
  useEffect(() => {
    const reqeastIntercep = instance.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${user.accessToken}`;
      return config;
    });
    const responceIntercep = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        const status = err.status;
        if (status === 401 || status === 403) {
          UserSingOut()
            .then(() => {
              navigate("/login");
            })
            .catch(() => {});
        }
      },
    );
    return () => {
      instance.interceptors.request.eject(reqeastIntercep);
      instance.interceptors.response.eject(responceIntercep);
    };
  }, [user, navigate, UserSingOut]);
  return instance;
};
export default useAxios;

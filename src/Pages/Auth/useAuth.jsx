import { useContext } from "react";
import { AuthContext } from "../../Component/Context/AuthContext/AuthContext";

const useAuth = () => {
  const userInfo = useContext(AuthContext);
  return userInfo;
};

export default useAuth;

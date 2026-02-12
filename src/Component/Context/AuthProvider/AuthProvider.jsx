import React, { useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../../Firebase/Firebase.init";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(true);
  const [loader, setLoader] = useState(true);
  const creatUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const UserSignin = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const UserSingOut = () => {
    setLoader(true);
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscript = onAuthStateChanged(auth, (currentUser) => {
      setLoader(currentUser);
      setLoader(false);
    });
    return () => {
      unsubscript();
    };
  }, []);
  const userInfo = {
    creatUser,
    UserSignin,
    UserSingOut,
    setUser,
    user,
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;

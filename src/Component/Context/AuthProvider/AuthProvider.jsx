import React, { useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateCurrentUser,
} from "firebase/auth";
import { auth } from "../../../Firebase/Firebase.init";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  console.log(user);
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
  const userUpdate = (userObject) => {
    updateCurrentUser(auth.currentUser, userObject);
  };
  useEffect(() => {
    const unsubscript = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
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
    userUpdate,
    user,
    loader,
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;

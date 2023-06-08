import React, { createContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure.js";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase.config.js";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const axiosSecure = useAxiosSecure();

  const createUser = (userId, phone, gender, role) =>
    axiosSecure.post(`/users`, { _id: userId, phone, gender, role });

  const signInWithEP = (email, password) => {
    setLoading(true);

    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = (_) => {
    setLoading(true);

    return signInWithPopup(auth, googleProvider).then((userCred) =>
      createUser(userCred.user.uid, ...Array(2), "student")
    );
  };

  const createUserWithEP = async (
    email,
    password,
    name,
    phone,
    gender,
    role,
    photo
  ) => {
    setLoading(true);

    const user = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((userCred) => createUser(userCred.user.uid, phone, gender, role));

    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });

    return user;
  };

  const logOut = (_) => signOut(auth);

  const authInfo = {
    loading,
    setLoading,
    userInfo,
    signInWithEP,
    signInWithGoogle,
    createUserWithEP,
    logOut,
  };

  useEffect(() => {
    const authChange = onAuthStateChanged(auth, (userCred) => {
      if (userCred) {
        setUserInfo(userCred);

        axiosSecure
          .post(`/jwt`, { _id: userCred.uid })
          .then((response) => localStorage.setItem("_at", response.data));
      } else {
        setUserInfo(null);
        localStorage.removeItem("_at");
      }

      setLoading(false);
    });

    return () => authChange();
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
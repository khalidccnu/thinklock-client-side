import React, { createContext, useEffect, useState } from "react";
import useAxiosIns from "../hooks/useAxiosIns.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase.config.js";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const axiosIns = useAxiosIns();

  const createUser = (userId, email, name, phone, gender, role, photo) =>
    axiosIns.post(`/users`, {
      _id: userId,
      email,
      name,
      phone,
      gender,
      role,
      photo,
    });

  const signInWithEP = (email, password) => {
    setLoading(true);

    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = (_) => {
    setLoading(true);

    return signInWithPopup(auth, googleProvider).then((userCred) =>
      createUser(
        userCred.user.uid,
        userCred.user.email,
        userCred.user.displayName,
        ...Array(2),
        "student",
        userCred.user.photoURL
      )
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

    return createUserWithEmailAndPassword(auth, email, password).then(
      async (userCred) => {
        const formData = new FormData();
        formData.append("userImg", photo);

        const userImg = await axiosIns.post(`/users/upload-ui`, formData);

        await createUser(
          userCred.user.uid,
          email,
          name,
          phone,
          gender,
          role,
          userImg.data.url
        );

        return updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: userImg.data.url,
        });
      }
    );
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
    const authChange = onAuthStateChanged(auth, async (userCred) => {
      if (userCred) {
        setUserInfo(userCred);

        await axiosIns
          .post(`/jwt`, { _id: userCred.uid })
          .then((response) => localStorage.setItem("_at", response.data))
          .then((_) => sessionStorage.setItem("_vu", JSON.stringify(true)));
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

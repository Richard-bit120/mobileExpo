import React, { createContext, useState, useEffect } from "react";
import { storeData, getData } from "../services/storage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ nombre: "Usuario Alumno", avatar: null });

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await getData("@user_profile");
      if (storedUser) setUser(storedUser);
    };
    loadUser();
  }, []);

  const updateAvatar = (imageUri) => {
    const updatedUser = { ...user, avatar: imageUri };
    setUser(updatedUser);
    storeData("@user_profile", updatedUser);
  };

  return (
    <UserContext.Provider value={{ user, updateAvatar }}>
      {children}
    </UserContext.Provider>
  );
};

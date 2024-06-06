import React, { useState, createContext } from "react";
export const UserDataContext = createContext(null);

const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const handleSetUserData = (data) => {
    // console.log("dataasdfgsdfgsdfg", data);
    localStorage.setItem("userData", JSON.stringify(data));

    setUserData(data);
  };
  return (
    <UserDataContext.Provider value={{ userData, handleSetUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;

import React from "react";

//Create a Context object

const UserContext = React.createContext();

//Provider component
export const UserProvider = UserContext.Provider;

export default UserContext;
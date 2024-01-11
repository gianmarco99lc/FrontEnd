import React from "react";

export const authReducer = (state, action) => {
  switch(action.type) {
    case "authenticate":
      return {isAuthenticated: true, userInfo: action.payload};
    case "unauthenticate":
      return {isAuthenticated: false, userInfo: null};
  }
}

export const authInfo = {
  isAuthenticated: false,
  userInfo: null
}

export const AuthContext = React.createContext();

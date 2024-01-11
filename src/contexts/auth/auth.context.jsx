import React from "react";

export const authReducer = (state, action) => {
  switch(action.type) {
    case "authenticate":
      return {...state, isAuthenticated: true, userInfo: action.payload};
    case "unauthenticate":
      return {...state, isAuthenticated: false, userInfo: null};
  }
}

export const authInfo = {
  isAuthenticated: false,
  userInfo: null
}

export const AuthContext = React.createContext();

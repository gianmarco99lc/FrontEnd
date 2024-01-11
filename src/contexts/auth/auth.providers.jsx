import { useReducer } from "react";
import { AuthContext, authInfo, authReducer } from "./auth.context"

export const AuthProvider = (props) => {

  const [ state, dispatch ] = useReducer(authReducer, authInfo);

  return (
    <AuthContext.Provider value={{authInfo: state, dispatch}}>
      {props.children}
    </AuthContext.Provider>
  );
}

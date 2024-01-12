import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth/auth.context";
import { CircularProgress } from "@mui/material";

export const Salir = () => {

  const navigate = useNavigate();

  const { setAuthentication } = useContext(AuthContext);

  setTimeout(() => {
    setAuthentication({type: "unauthenticate"});
    // navigate("/");
  }, 3000);

  return (
    <div className="logout">
      <CircularProgress />
      <span>Saliendo</span>
    </div>
  );
}

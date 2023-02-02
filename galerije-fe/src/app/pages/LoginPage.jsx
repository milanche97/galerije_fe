import { useDispatch } from "react-redux";
import { login } from "../store/auth/slice";
import { useHistory } from "react-router-dom";
import { useState } from "react";
// import AppLogin from "../components/AppLogin.component";
// import { AppLogin } from "../components/AppLogin";
import AppLogin from "../components/AppLogin";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  function handleOnLogin(e) {
    e.preventDefault();
    dispatch(login(credentials));
    console.log("Success!");
    // window.location.replace("/galleries");
  }

  return (
    <AppLogin
      handleOnLogin={handleOnLogin}
      credentials={credentials}
      setCredentials={setCredentials}
    />
  );
}

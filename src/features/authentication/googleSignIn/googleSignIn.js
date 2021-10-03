import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, useHistory } from "react-router-dom";
import { Button, FormGroup, Input, Label } from "reactstrap";
import image from "../../../component/constant/image";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../auth";
import "./googleSignIn.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading,] = useAuthState(auth);
  const history = useHistory();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }

    if (user) history.replace("/photos");
  }, [user,loading]);
  return (
    <div className="login" style={{ backgroundImage: `url(${image.image03})` }}>
      <div className="login__container">
        <h1 className="login__container__title">Login</h1>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button
          className="login__container__button"
          color="primary"
          onClick={() => {
            signInWithEmailAndPassword(email, password);
          }}
        >
          Login
        </Button>
        <div className="login__container__text">
          <p>or</p>
        </div>

        <Button
          className="login__container__button"
          color="danger"
          onClick={signInWithGoogle}
        >
          Login with Google
        </Button>
        <div className="login__container__signup">
          <p className="login__container__signup__title">
            Don't have an account
          </p>
          <NavLink //navigate to page
            exact
            className="login__container__signup__link"
            to="/photos"
          >
            Sign up
          </NavLink>
        </div>
      </div>
    </div>
  );
}
export default Login;

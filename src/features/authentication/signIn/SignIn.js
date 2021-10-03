import firebase from "firebase";
import React from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";
import SignInWihtGoogle from "../googleSignIn/googleSignIn";

SignIn.propTypes = {};

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API, //get from fire base project
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN, // get from fire base project

  // ...
};

const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("sign out successfull");
    })
    .catch(() => {
      console.log("sign out error");
    });
};

//firebase.initializeApp(config);

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],

  signInSuccessUrl: "/photos",
  callbacks: {
    // true is allow redirects after sign-in.
    signInSuccessWithAuthResult: () => true,
  },
};

function SignIn(props) {
  //Handle firebase change

  //get current user

  const currentUser = useSelector((state) => state.user);

  console.log("user:", currentUser);

  return (
    <div>
      <div className="text-center">
        <h2> Login form</h2>
        <p>Or login with social account</p>
        <Button onClick={signOut}>
          {currentUser.loading ? `${currentUser.name}` : "sign in"}
        </Button>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </div>
  );
}

export default SignIn;

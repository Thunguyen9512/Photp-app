import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import productApi from "./API/productApi";
import "./App.scss";
import NotFound from "./component/notFound/NotFound";
import firebase from "firebase";
import { getMe } from "./features/authentication/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Login from "./features/authentication/googleSignIn/googleSignIn";

console.log("environment", process.env);

/* Lazy load Photo component */
const Photo = React.lazy(() =>
  import("./features/Photo")
); /* Using React.lazy to load if requested, use with Suspense */

function App() {
  //get API
  // useEffect(() => {
  //   const fetchProductList = async () => {
  //     try {
  //       const params = { _page: 1, _limit: 10 };

  //       const response = await productApi.getAll(params);
  //       console.log("fetch success:", response);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };
  //   fetchProductList();
  // }, []);

  const dispatch = useDispatch();


 // log in
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          console.log("User is not login");
          return;
        }

        //dispatch to redux

        //catch error if Api request fail
        try {
          const action = getMe();

          const actionResolve = await dispatch(action);

          console.log("action:", unwrapResult(actionResolve));
        } catch (error) {
          console.log("fail:", error);
        }
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);


  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
        <Switch>
            <Redirect exact from="/" to="/photos" />
            <Route path="/photos" component={Photo} />
            <Route path="/signIn" component={Login} />
            <Route component={NotFound} />{" "}
            {/* if link is not match, Load Notfound component */}
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;

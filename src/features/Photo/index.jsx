/* PHOTO COMPONENT */

import React from "react";
import { useRouteMatch } from "react-router-dom";
import { Switch, Redirect, Route } from "react-router-dom";
import AddPhoto from "./components/AddPhoto";
import EditPhoto from "./components/EditPhoto";
import MainPage from "./components/MainPage";
import Header from "../../component/header/Header";

Photo.propTypes = {};

export default function Photo(props) {
  const match = useRouteMatch();
  return (
    <>
      <Header></Header>
      <Switch>
        <Route exact path={`${match.url}`} component={MainPage} />
        <Route path={`${match.url}/add`} component={AddPhoto} />
        <Route path={`${match.url}/edit`} component={EditPhoto} />
        <Redirect to="/notfound" />{" "}
        {/* redirect to /notfound when link not match in any case */}
      </Switch>
    </>
  );
}

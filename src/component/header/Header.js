import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Col, Container, Row, Button } from "reactstrap";
import "./Header.scss";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { logout } from "../../features/authentication/auth";
import { clearUser } from "../../features/authentication/userSlice";

/* sign out */

/* value on button */

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log("value on sign in:", user);

  const isLogin = user.isLogin;

  console.log("is login:", isLogin)

  const valueOnSignInButton = () => {
    if (user.isLogin) {
      return user.current.name;
    } else {
      return "Login";
    }
  };
  const signOut = () => {
    //sign out form firebase
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("sign out successfull");
      })
      .catch(() => {
        console.log("sign out error");
      });

    // sign out form redux
    dispatch(clearUser());
  };

  return (
    <header className="header">
      <Container className="h-100">
        <Row className=" h-100 justify-content-between align-items-center">
          <Col xs="auto">
            <div className={isLogin?"dropdown":""}>
              <NavLink //navigate to page
                exact
                className="signIn__link"
                to="/signIn"
                activeClassName="header__link--active" //add className when link is active
              >
                {valueOnSignInButton()}
              </NavLink>
              <div className="dropdown-content">
                <a onClick={signOut} href="#">
                  logout
                </a>
                <a href="#">account</a>
              </div>
            </div>
          </Col>
          <Col xs="auto">
            <NavLink //navigate to page
              exact
              className="header__link"
              to="/photos"
              activeClassName="header__link--active" //add className when link is actives
            >
              Main Page
            </NavLink>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

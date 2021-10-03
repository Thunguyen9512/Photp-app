/*  PHOTO MAIN PAGE */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { Button } from "reactstrap";
import Banner from "../../../component/banner/Banner";
import image from "../../../component/constant/image";
import PhotoList from "../../../component/photoList/PhotoList";
import "./MainPage.scss";

MainPage.propTypes = {};

function MainPage(props) {

  const match = useRouteMatch();

  const user = useSelector((state) => state.user);

  const bannerTitle = user.isLogin
    ? "PHOTO LIST OF " + user.current.name
    : "WELCOME";

  return (
    <div className="main-page">
      <Banner
        backgroundURL={image.image01}
        title={bannerTitle.toUpperCase()}
      ></Banner>
      <div className="main-page__container">
        <div className="main-page__button-group">
          <div>
            <Link to={`${match.url}/add`}>
              <Button className="main-page__button-group__button" color="info">
                ADD
              </Button>
            </Link>
          </div>
        </div>
        <PhotoList></PhotoList>
      </div>
    </div>
  );
}

export default MainPage;

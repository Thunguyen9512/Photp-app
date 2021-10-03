/* common component */

/* Banner */

import React from "react";
import PropTypes from "prop-types";
import "./Banner.scss";
import image from "../constant/image"; /* ../   back to father foder */

Banner.propTypes = {
  title: PropTypes.string,
  backgroundURl: PropTypes.string,
};

Banner.defaultProps = {
  title: "",
  backgroundURL: "",
};

function Banner(props) {
  const { backgroundURL, title } = props;

  const backgroundImage = backgroundURL ? backgroundURL : image.image03;

  const bannerTitle = title ? title : "Default Title";
  return (
    <>
      <div
        className="banner"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <h1 className="banner__text">{bannerTitle}</h1>
      </div>
    </>
  );
}

export default Banner;

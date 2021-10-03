import React from "react";
import { Button, Col } from "reactstrap";

import "./PhotoDisplay.scss";
import { Link, useRouteMatch } from "react-router-dom";

PhotoDisplay.propTypes = {};

function PhotoDisplay(props) {
  const { onRemoveButtonClick, onEditButtonClick, photo } = props;
  const { active, title, imageUrl } = photo;

  const match = useRouteMatch();
  if (active) {
    return (
      <Col lg="4" md="4" className="d-flex justify-content-center">
        <div className="photo">
          <div
            className="photo-display"
            style={{ backgroundImage: `url(${imageUrl})` }}
          >
            <div className="photo-display__content">
              <div>
                <p className="photo-display__content__title">{title}</p>
              </div>
              <div>
                <Button
                  className="photo-display__content__button"
                  outline
                  color="success"
                  onClick={() => onRemoveButtonClick(photo)}
                >
                  Remove
                </Button>
                <Link to={`${match.url}/edit`}>
                  <Button
                    className="photo-display__content__button"
                    onClick={() => onEditButtonClick(photo)}
                    outline
                    color="success"
                  >
                    Edit
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Col>
    );
  } else {
    return <Col lg="4" md="6" className="d-flex justify-content-center"></Col>;
  }
}
export default PhotoDisplay;

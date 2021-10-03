/* RANDOM PHOTO FIELD */

import React from "react";
import PropTypes from "prop-types";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import image from "../../constant/image";

import "./RandomPhotoField.scss";

RandomPhotoField.propTypes = {
  /* Fastfield props */
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  /* Custom props */

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disable: PropTypes.bool,
};
RandomPhotoField.defaultProps = {
  type: "",
  label: "",
  placeholder: "",
  disable: false,
};

function RandomPhotoField(props) {
  const { field, form, label } = props;
  const { name, onChange, value } = field;
  const { errors, touched } = form;

  const defaultUrl = image.blankImage;

  const randomPhotoButtonOnlick = () => {
    const tempUrl = `https://picsum.photos/id/${Math.floor(
      Math.random() * 1000
    )}/400/400`;
    const changeEvent = {
      target: {
        name: name,
        value: tempUrl,
      },
    };

    onChange(changeEvent);
  };

  //const invalid = errors.imageUrl ? true : false;
  const invalid = errors.imageUrl && touched.imageUrl ? true : false;

  return (
    <FormGroup className="photo-form__form__group">
      {label && <Label for={name}>{label}</Label>}
      <div>
        <Button color="success" onClick={randomPhotoButtonOnlick}>
          Random a photo
        </Button>
      </div>
      <div className="photo-form__form__group__image">
        <img
          className={invalid ? "is-invalid" : ""}
          src={value ? value : defaultUrl}
          alt="Not found, click again"
          onError={randomPhotoButtonOnlick}
        ></img>
      </div>
      <div className= {invalid?"is-invalid":""}/>
      <FormFeedback>{errors.imageUrl}</FormFeedback>{" "}
    </FormGroup>
  );
}

export default RandomPhotoField;

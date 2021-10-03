/* PHOTO FORM WITH REACTSTRAP AND FORMIK FORM */

import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { Spinner } from "react-bootstrap";
import { Button, FormGroup } from "reactstrap";
import * as Yup from "yup";
import { imageCategory } from "../constant/global";
import InputField from "./fieldComponent/InputField";
import RandomPhotoField from "./fieldComponent/RandomPhotoField";
import SelectField from "./fieldComponent/SelectField";
import "./PhotoForm.scss";


/* PhotoForm propTypes */
PhotoForm.propTypes = {
  action: PropTypes.func.isRequired,
};

/* PhotoForm */
function PhotoForm(props) {
  const { action, state, editPhoto } = props;

  /* ---------------edit photo---------------- */

  //let edittingPhoto = null;

  /* ----------------------------------------- */

  /* initial value for Formik */
  let initialValue = {
    active: true,
    title: "",
    category: "",
    imageUrl: "",
    authorId: "",
  };
  if (state === "edit") {
    //get initial value from redux
    console.log("------------: edit")
    initialValue = editPhoto;
  }

  const vadidateSchema = Yup.object().shape({
    title: Yup.string().required("Photo title required"),
    category: Yup.string().required("Photo category is required").nullable(),
    imageUrl: Yup.string().required("Image is required"),
  });

  return (
    <div className="photo-form">
      <Formik
        initialValues={initialValue}s
        validationSchema={vadidateSchema}
        onSubmit={action}
      >
        {(formikProps) => {
          console.log("formik props", formikProps);
          const { isSubmitting } = formikProps;

          return (
            <Form className="photo-form__form">
              <Field
                name="title"
                type="text"
                component={InputField}
                placeholder="Enter Photo title"
                label="Title"
              ></Field>

              <Field
                name="category"
                component={SelectField}
                options={imageCategory}
              ></Field>

              <Field
                label=""
                name="imageUrl"
                component={RandomPhotoField}
              ></Field>
              <FormGroup>
                <div>
                  <Button color="success" type="submit">
                    {isSubmitting && (
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    )}
                    Submit
                  </Button>
                </div>
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default PhotoForm;

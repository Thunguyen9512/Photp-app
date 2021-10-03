/* INPUT FIELD */
/* inputfield is a custom field, it's a bridge between UI control (Input component in this case) and Formik */
/* UI control is a controller component with props */
/* - name: name of control */
/* - value: value of control */
/* - onChange: trigger onchange function */
/* - onBlur: determind when the control was touched (like hover) */

import React from "react";
import PropTypes from "prop-types";
import { FormFeedback, FormGroup, Input, Label, Button } from "reactstrap";

InputField.propTypes = {
  /* Fastfield props */
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  /* Custom props */

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disable: PropTypes.bool,
};
InputField.defaultProps = {
  /* initial value to avoid uncontroller component */
  type: "",
  label: "",
  placeholder: "",
  disable: false,
};

function InputField(props) {
  const { field, form, placeholder, label, disable } = props;
  const { name, onBlur, value, onChange } = field;

  const { errors, touched } = form;

  //const showError = errors[name] && touched[name];

  const invalid = errors.title && touched.title;

  return (
    <div>
      <FormGroup>
        {label && <Label for={name}>{label}</Label>}
        <Input
          //field
          name={name}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          //custom
          placeholder={placeholder}
          type="text"
          disabled={disable}
          label={label}
          invalid={invalid}
        />
        <FormFeedback>{errors.title}</FormFeedback>{" "}
        {/* apear only when prev element is invalid */}
      </FormGroup>
    </div>
  );
}

export default InputField;

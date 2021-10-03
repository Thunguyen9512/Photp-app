/* SELECTED FIELD */
/* inputfield is a custom field, it's a bridge between UI control (Input component in this case) and Formik */
/* UI control is a controller component with props */
/* - name: name of control */
/* - value: value of control */
/* - onChange: trigger onchange function */
/* - onBlur: determind when the control was touched */

import PropTypes from "prop-types";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { imageCategory } from "../../constant/global";
SelectField.propTypes = {
  /* Fastfield props */
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  /* Custom props */

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disable: PropTypes.bool,
};
SelectField.defaultProps = {
  /* initial value to avoid uncontroller component */
  type: "",
  label: "",
  placeholder: "",
  disable: false,
};

function SelectField(props) {
  const { field, form } = props;
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;

  const handleSelectedOptionChange = (e) => {
    if (e.target.value !== null) {
      const changeEvent = {
        target: {
          name: name,
          value: e.target.value,
        },
      };
      onChange(changeEvent); //onChange will trigger rerender
    }
  };

  const invalid = errors.category && touched.category ? true : false;

  return (
    <div>
      <div>
        <FormGroup name={name}>
          {name && <Label for={name}>{name}</Label>}
          <Input
            type="select"
            value={value}
            name={name}
            id="exampleSelect"
            onChange={handleSelectedOptionChange}
            onBlur={onBlur} //touch is true onBlur
            className={invalid ? "is-invalid" : ""}
          >
            {imageCategory.map((item) => {
              return <option key={item}>{item}</option>;
            })}
          </Input>
          <FormFeedback>{errors.category}</FormFeedback>{" "}
        </FormGroup>
      </div>
    </div>
  );
}

export default SelectField;

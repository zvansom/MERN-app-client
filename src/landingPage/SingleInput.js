import React from "react";
import InputField from "../components/InputField";

const SingleInput = props => (
  <div className="single-input">
    <label className={props.name} />
    <InputField
      name={props.name}
      type={props.inputType}
      value={props.content}
      onChange={props.controlFunc}
      placeholder={props.placeholder}
      inputWidth={props.width}
    />
  </div>
);

export default SingleInput;

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const InputField = props => {
  return (
    <Input
      className={props.name}
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      min={props.min || ""}
      max={props.max || ""}
      step={props.step || ""}
    />
  );
};

InputField.propTypes = {
  type: PropTypes.oneOf(["text", "number", "password"]).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  placeholder: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  step: PropTypes.string
};

export default InputField;

const Input = styled.input`
  background: white;
  color: #319cd6;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #319cd6;
  border-radius: 5px;
`;

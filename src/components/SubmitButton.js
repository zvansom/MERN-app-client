import React from "react";
import styled from "styled-components";

const SubmitButton = props => {
  return <Button data-symbol={props.symbol} onClick={props.handleClick} fillColor={props.fillColor}>{props.value} </Button>;
};

export default SubmitButton;

const Button = styled.button`
  background: ${props => props.fillColor || "#0b77c4"};
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #0b77c4;
  border-radius: 3px;
`;

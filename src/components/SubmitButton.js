import React from "react";
import styled from "styled-components";

const SubmitButton = props => {
  return (
    <Button
      data-symbol={props.symbol}
      data-price={props.price}
      onClick={props.handleClick}
      fillColor={props.fillColor}
    >
      {props.value}{" "}
    </Button>
  );
};

export default SubmitButton;

const Button = styled.button`
  background: #77d9d4;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 20px;
`;

// <<<<<<< HEAD
//   return (
//     <Button
//       fillColor={props.fillColor}
//       onClick={props.onClick ? props.onClick : null}
//     >
//       {props.value}
//     </Button>
//   );
// =======

  // background: ${props => props.fillColor || "#0b77c4"};
    // border: 2px solid #0b77c4;

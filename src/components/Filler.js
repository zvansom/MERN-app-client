import React from "react";
import styled from "styled-components";

const Filler = props => {
  return (
    <Fill className="filler" percent={props.percentage} color={props.fillColor}>
      {props.lossGain}
    </Fill>
  );
};

export default Filler;

const Fill = styled.div`
  width: ${props => props.percent || "0%"};
  background: linear-gradient(
    to right,
    ${props => props.color} ${props => props.percent + "%"},
    #319cd6 ${props => 100 - props.percent + "%"}
  );
  height: 100%;
  border-radius: inherit;
  transition: width 0.2s ease-in;
`;

import React, { Component } from "react";
import Filler from "./Filler";
import styled from "styled-components";

class ProgressBar extends Component {
  render() {
    let currentValue =
      Number(this.props.portfolioValue) + Number(this.props.workingCapital);
    let p = (currentValue / Number(this.props.initialCapital) - 1) * 100;
    let color = p > 1 ? "#96ceb4" : p === 0 ? "#319cd6" : "#c83349";
    let lossGain =
      p > 1 ? p.toFixed(2) + "%" : p === 0 ? "" : p.toFixed(2) + "%";
    let percentage = p > 1 ? p.toFixed(2) : p === 0 ? "100" : p.toFixed(2);

    return (
      <Progress className="progress-bar">
        <Filler percentage={percentage} fillColor={color} lossGain={lossGain} />
      </Progress>
    );
  }
}

export default ProgressBar;

const Progress = styled.div`
  position: relative;
  height: 20px;
  width: 300px;
  border-radius: 50px;
  border: 1px solid #0b77c4;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

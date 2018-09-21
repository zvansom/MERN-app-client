import React, { Component } from "react";
import Filler from "./Filler";
import styled from "styled-components";

class ProgressBar extends Component {
  render() {
    let initialCapital = 100000;
    let pvCurrent = this.props.portfolioValue;
    let pvStart = initialCapital - this.props.workingCapital;
    let percentage = (pvCurrent / pvStart - 1) * 100;
    console.log("percentage", percentage);
    console.log("pvCurrent", pvCurrent);
    console.log("pvStart", pvStart);

    let lossGain;
    let color;

    if (percentage > 1) {
      lossGain = percentage.toFixed(2) + "%";
      color = "#96ceb4";
    } else {
      lossGain = percentage.toFixed(2) + "%";
      color = "#c83349";
    }
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

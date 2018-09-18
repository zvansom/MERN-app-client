import React, { Component } from "react";
import Filler from "./Filler";
import styled from "styled-components";

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lossGain: "",
      color: "",
      percentage: "100"
    };
  }

  componentDidMount() {
    const initialCapital = 100000;
    if (this.props.workingCapital > 0) {
      let p = (this.props.workingCapital % initialCapital) * 100;
      this.setState({
        lossGain: "$" + this.props.workingCapital / 1000 + "K",
        color: "#0b77c4",
        percentage: p
      });
    } else {
      let p = Math.ceil((this.props.portfolioTotal / initialCapital) * 100);
      if (this.props.portfolioTotal > initialCapital) {
        let gain = p - 100;
        this.setState({
          lossGain: "+" + gain + "%",
          color: "#96ceb4",
          percentage: gain < 100 ? gain : "100"
        });
      } else {
        console.log("loss", p);
        let loss = 100 - p;
        this.setState({
          lossGain: "-" + loss + "%",
          color: "#c83349",
          percentage: p
        });
      }
    }
  }
  render() {
    return (
      <Progress className="progress-bar">
        <Filler
          percentage={this.state.percentage}
          fillColor={this.state.color}
          lossGain={this.state.lossGain}
        />
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

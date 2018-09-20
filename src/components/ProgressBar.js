import React, { Component } from "react";
import Filler from "./Filler";
import styled from "styled-components";

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lossGain: "",
      color: "",
      percentage: "100",

    };
  }
  
  shouldComponentUpdate(nextProp, nextState) {
    // let currentValues = await this.props.portfolio.map(stock => getCurrentValue(stock)
    //   .then(res => { 
    //     let currentPortfolio = this.state.portfolioValue;
    //     currentPortfolio += res.price * res.numShares;
    //     this.setState({portfolioValue: currentPortfolio})
    // }));
    if(nextProp.portfolioValue !== this.props.portfolioValue) {
      const initialCapital = 100000;
      if (this.props.workingCapital > 0) {
        let p = (this.props.workingCapital % initialCapital) * 100;
        this.setState({
          lossGain: "$" + this.props.workingCapital / 1000 + "K",
          color: "#0b77c4",
          percentage: p
        });
      } else {
        let p = Math.ceil((this.props.portfolioValue / initialCapital) * 100);
        if (this.props.portfolioValue > initialCapital) {
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
      return true;
    }
    return false;
  }
  render() {
    return (
      <Progress className="progress-bar">
      <h4>Current Portfolio Value: ${this.props.portfolioValue}</h4>
        {/* <Filler
          percentage={this.state.percentage}
          fillColor={this.state.color}
          lossGain={this.state.lossGain}
        /> */}
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

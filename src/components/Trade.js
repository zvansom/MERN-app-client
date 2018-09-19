import React, { Component } from "react";
import SubmitButton from "./SubmitButton";
import ShareAmount from "./ShareAmount";

export default class Trade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shares: 0,
      portfolio: [{ abc: 15, www: 20 }], //TODO: this should be actual user data if existing user
      workingCaptal: 100000, //TODO: this should be actual user data if existing user
      sharePrice: 1000, //TODO: this should be actual user data if existing user
      company: "abc" //TODO: this should be actual user data if existing user
    };
  }

  handleshares = e => {
    e.preventDefault();
    this.setState({ shares: e.target.value });
  };

  hundleSell = e => {
    e.preventDefault();
    // Update user potfolio
    let shares = this.state.shares;
    let newPortfolio = this.state.portfolio[0] || {};
    let totalShares = newPortfolio[this.state.company] - shares;
    newPortfolio[this.state.company] = totalShares;
    // Update user working capital
    let totalGain = this.state.sharePrice * shares;
    let newWorkingCapital = this.state.workingCaptal + totalGain;
    this.setState({
      portfolio: newPortfolio,
      workingCaptal: newWorkingCapital
    });
    console.log("portfolio", this.state.portfolio);
    console.log("workingCaptal", newWorkingCapital);
  };

  hundleBuy = e => {
    e.preventDefault();
    // Update user potfolio
    let shares = this.state.shares;
    let newPortfolio = this.state.portfolio[0] || {};
    let totalShares = newPortfolio[this.state.company]
      ? newPortfolio[this.state.company] + shares
      : shares;
    newPortfolio[this.state.company] = totalShares;
    // Update user working capital
    let totalSpend = this.state.sharePrice * shares;
    let newWorkingCapital = this.state.workingCaptal - totalSpend;
    this.setState({
      portfolio: newPortfolio,
      workingCaptal: newWorkingCapital
    });
    console.log("workingCaptal", this.state.workingCaptal);
    console.log("portfolio", this.state.portfolio);
  };

  render() {
    // TODO : Pass these props from user data
    let sellmax = Math.floor(Math.random() * 8);
    let buymax = "10";

    return (
      <div>
        {{ sellmax } && (
          <div>
            <SubmitButton
              value="Sell"
              fillColor="#ff6f69"
              onClick={this.hundleSell}
            />
            <ShareAmount max={sellmax} handleshares={this.handleshares} />
          </div>
        )}
        <div>
          <SubmitButton
            value="Buy"
            fillColor="#c83349"
            onClick={this.hundleBuy}
          />
          <ShareAmount max={buymax} handleshares={this.handleshares} />
        </div>
      </div>
    );
  }
}

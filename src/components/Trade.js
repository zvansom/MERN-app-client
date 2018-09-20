import React, { Component } from "react";
import SubmitButton from "./SubmitButton";
import ShareAmount from "./ShareAmount";
import styled from "styled-components";

export default class Trade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shares: 0,
      portfolio: this.props.portfolio,
      workingCaptal: 100000,
      sharePrice: this.props.currentPrice,
      symbol: this.props.symbol
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
    console.log("sharePrice", this.state.sharePrice);

    let newPortfolio = this.state.portfolio || [{}];
    let newWorkingCapital;
    newPortfolio.forEach(stock => {
      if (stock.symbol === this.state.symbol) {
        stock.numShares -= shares;
        // Update user working capital
        let totalGain = this.state.sharePrice * shares;
        newWorkingCapital = this.state.workingCaptal + totalGain;
        this.setState({
          portfolio: newPortfolio,
          workingCaptal: newWorkingCapital
        });
        console.log("portfolio", this.state.portfolio);
        console.log("workingCaptal", newWorkingCapital);
      }
    });
  };

  hundleBuy = e => {
    e.preventDefault();
    // Update user potfolio
    console.log("portfolio", this.state.portfolio);
    console.log("workingCaptal", this.state.workingCaptal);
    let shares = this.state.shares;
    let newPortfolio = this.state.portfolio || [{}];
    let newWorkingCapital;
    let found = false;
    newPortfolio.forEach(stock => {
      if (stock.symbol === this.state.symbol) {
        stock.numShares += shares;
        // Update user working capital
        let totalSpend = this.state.sharePrice * shares;
        newWorkingCapital = this.state.workingCaptal - totalSpend;
        found = !found;
      }
    });
    if (found) {
      newPortfolio[this.state.symbol] = shares;
      let totalSpend = this.state.sharePrice * shares;
      newWorkingCapital = this.state.workingCaptal - totalSpend;
    }

    this.setState({
      portfolio: newPortfolio,
      workingCaptal: newWorkingCapital
    });
  };

  render() {
    // TODO : Pass these props from user data
    let sellmax = Math.floor(Math.random() * 8);
    let buymax = "10";

    return (
      <StyledDiv>
        {{ sellmax } && (
          <div>
            <SubmitButton
              value="Sell"
              fillColor="#ff6f69"
              handleClick={this.hundleSell}
            />
            <ShareAmount max={sellmax} handleshares={this.handleshares} />
          </div>
        )}
        <div>
          <SubmitButton
            value="Buy"
            fillColor="#c83349"
            handleClick={this.hundleBuy}
          />
          <ShareAmount max={buymax} handleshares={this.handleshares} />
        </div>
      </StyledDiv>
    );
  }
}

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 1fr);
  grid-auto-flow: column;
`;

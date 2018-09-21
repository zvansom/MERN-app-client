import React, { Component } from "react";
import SubmitButton from "./SubmitButton";
import ShareAmount from "./ShareAmount";
import styled from "styled-components";
import SelectTrade from "./SelectTrade";

export default class Trade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trade: "",
      shares: 0,
      sellMax: "",
      buyMax: ""
    };
  }

  handleShares = e => {
    e.preventDefault();
    this.setState({ shares: e.target.value });
    // console.log(this.state.shares);
  };

  handleTradeSelection = e => {
    this.setState({ trade: e.target.value });
    // console.log("trade", this.state.trade);
  };

  hundleTrade = e => {
    e.preventDefault();

    let trade = this.state.trade;
    if (!trade) {
      return;
    }
    let shares = Number(this.state.shares);
    let symbol = this.props.symbol;
    let tradeValue = this.props.currentPrice * shares;
    let newPortfolio = [...this.props.portfolio] || [{}];
    let newCapital = this.props.workingCapital;
    [newPortfolio, newCapital] = calculatePortfolio(
      trade,
      shares,
      symbol,
      newPortfolio,
      tradeValue,
      newCapital
    );
    this.setState({
      portfolio: newPortfolio,
      workingCaptal: newCapital,
      shares: 0,
      trade: ""
    });

    console.log("newPortfolio", newPortfolio);
    console.log("newWorkingCapital", newCapital);
    console.log("traded shares", this.state.shares);
  };

  render() {
    // TODO : Pass these props from user data
    const { portfolio, symbol } = this.props;
    let tradeArray;
    let buyMax;
    var ownedShares = this.props.portfolio.find(function(stock) {
      return stock.symbol === symbol;
    });

    let sellMax = ownedShares ? ownedShares.numShares : "";
    if (sellMax) {
      buyMax = Math.floor(this.props.workingCapital / this.props.currentPrice);
      tradeArray = ["Buy", "Sell"];
    } else {
      buyMax = 100; //TODO: we need actual values on load??
      tradeArray = ["Buy"];
    }
    let max =
      this.state.trade === ""
        ? 0
        : this.state.trade === "Sell"
          ? sellMax
          : buyMax;
    // console.log("trade", this.state.trade);
    // console.log("tradeArray", tradeArray);
    // console.log("max", max);
    // console.log("buyMax", buyMax);
    // console.log("sellMax", sellMax);
    return (
      <Table>
        <tbody>
          <tr>
            <td>
              <SelectTrade
                name={"trade"}
                placeholder={"Trade:"}
                controlFunc={this.handleTradeSelection}
                options={tradeArray}
                selectedOption={this.state.trade}
              />
            </td>
            <td>
              <ShareAmount max={max} handleshares={this.handleShares} x />
            </td>
            <td>
              $ {(this.state.shares * this.props.currentPrice).toFixed(2)}
            </td>
            <td>
              {" "}
              <SubmitButton
                value={this.state.trade || "Trade"}
                fillColor={this.state.trade ? "#405d27" : "#d5e1df"}
                handleClick={this.hundleTrade}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

const Table = styled.table`
  background: #319cd6;
  border-spacing: 10px;
  > td {
    padding: 6px;
  }
`;

// Helpers
function calculatePortfolio(
  trade,
  shares,
  symbol,
  newPortfolio,
  tradeValue,
  newCapital
) {
  if (trade === "Sell") {
    newCapital += tradeValue;
    newPortfolio.forEach(stock => {
      if (stock.symbol === symbol) {
        stock.numShares -= shares;
      }
    });
  } else {
    newCapital -= tradeValue;
    var ownedShares = newPortfolio.find(function(stock) {
      return stock.symbol === symbol;
    });

    let newSahres = ownedShares
      ? (ownedShares.numShares += shares)
      : {
          symbol: symbol,
          numShares: shares
        };

    newPortfolio.push(newSahres);
  }
  return [newPortfolio, newCapital];
}

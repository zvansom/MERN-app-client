import React, { Component } from "react";
import SubmitButton from "./SubmitButton";
import ShareAmount from "./ShareAmount";
import styled from "styled-components";
import SelectTrade from "./SelectTrade";

export default class Trade extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     sellMax: "",
  //     buyMax: ""
  //   };
  // }

  render() {
    // TODO : Pass these props from user data
    const {
      portfolio,
      symbol,
      currentPrice,
      workingCapital,
      trade,
      shares
    } = this.props;
    let tradeArray;
    let buyMax;
    const ownedShares = portfolio.find(function(stock) {
      return stock.symbol === symbol;
    });

    let sellMax = ownedShares ? ownedShares.numShares : "";
    if (sellMax) {
      buyMax = Math.floor(workingCapital / currentPrice);
      tradeArray = ["Buy", "Sell"];
    } else {
      buyMax = 100; //TODO: we need actual values on load??
      tradeArray = ["Buy"];
    }
    let max = trade === "" ? 0 : trade === "Sell" ? sellMax : buyMax;
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
                controlFunc={this.props.handleTradeSelection}
                options={tradeArray}
                selectedOption={trade}
              />
            </td>
            <td>
              <ShareAmount max={max} handleshares={this.props.handleShares} x />
            </td>
            <td>$ {(shares * currentPrice).toFixed(2)}</td>
            <td>
              {" "}
              <SubmitButton
                value={trade || "Trade"}
                fillColor={trade ? "#405d27" : "#d5e1df"}
                handleClick={this.props.hundleTrade}
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

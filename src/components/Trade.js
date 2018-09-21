import React, { Component } from "react";
import SubmitButton from "./SubmitButton";
import ShareAmount from "./ShareAmount";
import styled from "styled-components";
import SelectTrade from "./SelectTrade";

export default class Trade extends Component {
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

    const buyMax = Math.floor(workingCapital / currentPrice);

    const ownedShares = portfolio.find(stock => stock.symbol === symbol);
    let tradeArray = ownedShares ? ["Buy", "Sell"] : ["Buy"];
    const sellMax = ownedShares ? ownedShares.numShares : "";
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
              <ShareAmount
                max={max}
                handleshares={this.props.handleShares}
                shares={this.props.shares}
              />
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
  float: right;
  background: #fff;
  border-radius: 20px;
  border-spacing: 10px;
  > td {
    padding: 6px;
  }
`;

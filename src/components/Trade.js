import React, { Component } from "react";
import SubmitButton from "./SubmitButton";
import ShareAmount from "./ShareAmount";
import styled from "styled-components";
import SelectTrade from "./SelectTrade";

export default class Trade extends Component {
  render() {
    const { trade, shares, currentPrice, tradeArray, max } = this.props;

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
                shares={this.props.shares}
                decreaseShares={this.props.decreaseShares}
                incrementShares={this.props.incrementShares}
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
  background: #319cd6;
  border-spacing: 10px;
  > td {
    padding: 6px;
  }
`;

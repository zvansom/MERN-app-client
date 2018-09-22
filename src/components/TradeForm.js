import React, { Component } from "react";
import SubmitButton from "./SubmitButton";
import ShareAmount from "./ShareAmount";
import styled from "styled-components";

export default class TradeForm extends Component {
  render() {
    const { trade, shares, currentPrice, tradeArray, max } = this.props;

    return (
      <StyledTradeForm>
        <select className="form-select">
          <option value="Buy">Buy</option>
          <option value="Sell">Sell</option>
        </select>
        <ShareAmount
          max={max}
          shares={this.props.shares}
          decreaseShares={this.props.decreaseShares}
          incrementShares={this.props.incrementShares}
        />
      {(shares * currentPrice).toFixed(2)}
        {" "}
        <SubmitButton
          value={trade || "Trade"}
          fillColor={trade ? "#405d27" : "#d5e1df"}
          handleClick={this.props.hundleTrade}
        />
      </StyledTradeForm>
    );
  }
}

const StyledTradeForm = styled.form`
  color: #000;
  display: inline-block;
  background: #fff;
  border-radius: 20px;
  border-spacing: 10px;
  > td {
    padding: 6px;
  }
`;

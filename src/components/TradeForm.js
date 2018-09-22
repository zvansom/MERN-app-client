import React, { Component } from "react";
import styled from "styled-components";

export default class TradeForm extends Component {
  render() {
    const { trade, shares, currentPrice, tradeArray, max } = this.props;

    return (
      <StyledTradeForm>
        <div className="form-element">
          <select className="form-select">
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
        </div>
        <div className="form-element">
          <button> - </button>
          <p>{this.props.shares}</p>
          <button> + </button>
        </div>
        {(shares * currentPrice).toFixed(2)}
        {" "}
        <input type="submit" value="Trade" />
      </StyledTradeForm>
    );
  }
}

const StyledTradeForm = styled.form`
  display: grid;
  gap: 20px;
  grid-auto-flow: column;
  color: #000;
  background: #fff;
  > .form-element {
    display: inline-block;
    > p {
      display: inline;
    }
  }
`;

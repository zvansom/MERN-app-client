import React, { Component } from "react";
import styled from "styled-components";

export default class TradeForm extends Component {
  render() {
    const { trade, handleTradeSelection, shares, currentPrice, decreaseShares, incrementShares, handleTrade } = this.props;

    return (
      <StyledTradeForm onSubmit={handleTrade}>
        <div className="form-element">
          <select className="form-select" value={trade} onChange={handleTradeSelection}>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
        </div>
        <div className="form-element">
          <button onClick={decreaseShares}> - </button>
          <p>{this.props.shares}</p>
          <button onClick={incrementShares}> + </button>
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

import React, { Component } from "react";
import styled from "styled-components";

class ShareAmount extends Component {
  render() {
    let tradeLimit = this.props.shares < this.props.max;
    return (
      <div>
        <button onClick={tradeLimit ? this.props.incrementShares : null}>
          +
        </button>
        <Button>{this.props.shares}</Button>
        <button onClick={tradeLimit ? this.props.decreaseShares : null}>
          -
        </button>
      </div>
    );
  }
}

export default ShareAmount;

const Button = styled.button`
  background: #77d9d4;
  color: white;
  font-size: 1em;
  padding: 0.25em 1em;
`;

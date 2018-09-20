import React, { Component } from "react";
import styled from "styled-components";
import SubmitButton from "./SubmitButton";

import { arrowDown } from "react-icons-kit/fa/arrowDown";
import { arrowUp } from "react-icons-kit/fa/arrowUp";
import { Icon } from "react-icons-kit";

export default class StockRow extends Component {
  state = {
    price: null,
    up: Math.round(Math.random() * 100) / 100
  };

  async componentDidMount() {
    const url = `https://api.iextrading.com/1.0/stock/${
      this.props.symbol
    }/ohlc`;
    const response = await fetch(url);
    const parse = await response.json();

    this.setState({
      price: parse.close.price
    });
  }

  render() {
    let arrow;
    if (this.state.up > 0.5) {
      arrow = (
        //TODO: hardcoded pewrcentages

        <td style={{ color: "#4040a1" }}>
          +{this.state.up * 100}%<Icon size={25} icon={arrowUp} />
        </td>
      );
    } else {
      arrow = (
        <td style={{ color: "#c83349" }}>
          -{this.state.up * 100}%<Icon size={25} icon={arrowDown} />
        </td>
      );
    }

    return (
      <StyledTr>
        <td>
          {this.props.name} <span>({this.props.symbol})</span>
        </td>
        <td>{this.state.price}</td>
        {arrow}

        <td>
          <SubmitButton
            symbol={this.props.symbol}
            value="See More"
            currentPrice={this.state.price}
            handleClick={this.props.handleClick}
          />
        </td>
      </StyledTr>
    );
  }
}

const StyledTr = styled.tr`
  > td {
    border: 1px solid black;
  }
`;

import React, { Component } from "react";
import styled from "styled-components";
import SubmitButton from "./SubmitButton";

import { arrowDown } from "react-icons-kit/fa/arrowDown";
import { arrowUp } from "react-icons-kit/fa/arrowUp";
import { Icon } from "react-icons-kit";

export default class StockRow extends Component {
  state = {
    closePrice: null,
    openPrice: null
  };

  async componentDidMount() {
    const url = `https://api.iextrading.com/1.0/stock/${
      this.props.symbol
    }/ohlc`;
    const response = await fetch(url);
    console.log('response throwing errors - async issue?', response);
    const parse = await response.json();

    this.setState({
      closePrice: parse.close.price,
      openPrice: parse.open.price
    });
  }

  render() {
    const { openPrice, closePrice } = this.state;
    const percentChange = (
      ((closePrice - openPrice) / openPrice) *
      100
    ).toFixed(2);
    let arrow;
    if (openPrice < closePrice) {
      arrow = (
        <td style={{ color: "#57bc90" }}>
          {percentChange}%<Icon size={25} icon={arrowUp} />
        </td>
      );
    } else {
      arrow = (
        <td style={{ color: "#c83349" }}>
          {percentChange}%<Icon size={25} icon={arrowDown} />
        </td>
      );
    }
    return (
      <StyledTr>
        <td>
          {this.props.name} <span>({this.props.symbol})</span>
        </td>
        <td>{this.state.closePrice}</td>
        {arrow}

        <td>
          <SubmitButton
            symbol={this.props.symbol}
            value="See More"
            price={this.state.closePrice}
            handleClick={this.props.handleClick}
          />
        </td>
      </StyledTr>
    );
  }
}

const StyledTr = styled.tr`
  > td {
    border: 1px solid #ddd;
    padding: 8px;
  }
`;

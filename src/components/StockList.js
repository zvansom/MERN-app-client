import React, { Component } from "react";
import styled from "styled-components";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import LineChart from "../chart/LineChart";
import Toggle from './Toggle';

import { arrowDown } from "react-icons-kit/fa/arrowDown";
import { arrowUp } from "react-icons-kit/fa/arrowUp";
import { Icon } from "react-icons-kit";

export default class StockList extends Component {
  state = {
    price: null,
    up: Math.round(Math.random() * 100) / 100,
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
          +{this.state.up * 100}%
          <Icon size={25} icon={arrowUp} />
        </td>
      );
    } else {
      arrow = (
        <td style={{ color: "#c83349" }}>
          -{this.state.up * 100}%
          <Icon size={25} icon={arrowDown} />
        </td>
      );
    }

    return (
      <StyledTr>
        <td>{this.props.name}</td>
        <td>{this.state.price}</td>
        {arrow}
        <td>
          <InputField
          name={"shares"}
          type={"number"}
          placeholder={"0"}
          onChange={this.handleClear}
          min={"0"}
          max={"100"} //TODO: this should be based on your available funds
          step={"1"}
          />
        </td>
        <td id="submit-containers">
          <SubmitButton value="Sell" fillColor="#ff6f69" />
          <SubmitButton value="Buy" fillColor="#c83349" />
        </td>
        <Toggle>
        {({ on, toggle }) => (
          <div>
            <button onClick={toggle}>Show</button>
            {on && <LineChart symbol={this.props.symbol} />}
          </div>
        )}
        </Toggle>
      </StyledTr>
    );
  }
}

const StyledTr = styled.tr`

  > td {
  border: 1px solid black;

  }
`;
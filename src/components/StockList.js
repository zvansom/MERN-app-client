import React, { Component } from "react";
import styled from "styled-components";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import LineChart from "../chart/LineChart";
import Toggle from './Toggle';

// import { arrowDown } from "react-icons-kit/fa/arrowDown";
// import { arrowUp } from "react-icons-kit/fa/arrowUp";
// import { Icon } from "react-icons-kit";

export default class StockList extends Component {
  state = {
    price: null,
    up: Math.round(Math.random() * 100) / 100,
  };

  // async componentDidMount() {
  //   const url = `https://api.iextrading.com/1.0/stock/${
  //     this.props.symbol
  //   }/ohlc`;
  //   const response = await fetch(url);
  //   const parse = await response.json();

  //   this.setState({
  //     price: parse.close.price
  //   });
  // }

  render() {
    let arrow;
    if (this.state.up > 0.5) {
      arrow = (
        //TODO: hardcoded pewrcentages
        <div style={{ color: "#4040a1" }}>
          +{this.state.up * 100}%
          {/* <Icon size={25} icon={arrowUp} /> */}
        </div>
      );
    } else {
      arrow = (
        <div style={{ color: "#c83349" }}>
          -{this.state.up * 100}%
          {/* <Icon size={25} icon={arrowDown} /> */}
        </div>
      );
    }

    return (
      <StockItem>
        <p>{this.props.name}</p>
        <p>{this.state.price}</p>
        {arrow}
        <InputField
          name={"shares"}
          type={"number"}
          placeholder={"0"}
          onChange={this.handleClear}
          min={"0"}
          max={"100"} //TODO: this should be based on your available funds
          step={"1"}
        />
        <div id="submit-containers">
          <SubmitButton value="Sell" fillColor="#ff6f69" />
          <SubmitButton value="Buy" fillColor="#c83349" />
        </div>
          <Toggle>
          {({ on, toggle }) => (
            <div>
              <button onClick={toggle}>Show</button>
              {on && <LineChart symbol={this.props.symbol} />}
            </div>
          )}
          </Toggle>
      </StockItem>
    );
  }
}

const StockItem = styled.div`
  border: 1px solid black;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
`;
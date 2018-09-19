import React, { Component } from "react";
import styled from "styled-components";
import { Top100 } from "../constants/Top100";

import StockList from "./StockList";

export default class Accordion extends Component {
  render() {
    return (
      <StyledTable>
        <thead>
          <tr>
            <th>Stock Name</th>
            <th>Share Value</th>
            <th>Loss | Gain</th>
          </tr>
        </thead>
        <tbody>
          {Top100.map((stock, idx) => (
            <StockList
              key={idx}
              index={idx}
              name={stock.name}
              symbol={stock.symbol}
              handleClick={this.props.handleClick}
            />
          ))}
        </tbody>
      </StyledTable>
    );
  }
}

const StyledTable = styled.table`
  border: 3px solid black;
  background: #319cd6;
`;

import React, { Component } from "react";
import styled from "styled-components";
import { Top100 } from "../constants/Top100";

import StockList from "./StockList";

export default class Accordion extends Component {
  render() {
    // TODO: Look into turning the accordion into a table element
    return (
      <StyledTable>
        <thead>
          <th>Stock Name</th>
          <th>Share Value</th>
          <th>Loss | Gain</th>
          <th>Number of Share</th>
          <th>Sell | Buy</th>
        </thead>
        <tbody>
          {Top100.map((stock, idx) => (
            <StockList
              key={idx}
              index={idx}
              name={stock.name}
              symbol={stock.symbol}
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

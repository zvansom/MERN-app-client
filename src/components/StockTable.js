import React, { Component } from "react";
import styled from "styled-components";
import { Top100 } from "../constants/Top100";

import StockRow from "./StockRow";

export default class StockTable extends Component {
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
            <StockRow
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

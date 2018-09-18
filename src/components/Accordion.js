import React, { Component } from "react";
import styled from "styled-components";
import { Top100 } from "../constants/Top100";

import StockList from "./StockList";

export default class Accordion extends Component {
  state = {
    activeTab: null,
    sahres: null
  };

  handleClick = e => {
    console.log("Accordion clicked!");
    const index = e.target.dataset.index;
    this.setState({ activeTab: index === this.state.activeTab ? null : index });
  };

  handleShares = e => {};
  render() {
    return (
      <div>
        <AccordionHeader>
          <div>Stock Name</div>
          <div>Share Value</div>
          <div>Loss | Gain</div>
          <div>Number of Share</div>
          <div>Sell | Buy</div>
        </AccordionHeader>

        <AccordionWrapper>
          {Top100.map((stock, idx) => (
            <StockList
              handleClick={this.handleClick}
              key={idx}
              index={idx}
              name={stock.name}
              activeTab={this.state.activeTab}
              symbol={stock.symbol}
            />
          ))}
        </AccordionWrapper>
      </div>
    );
  }
}

const AccordionWrapper = styled.div`
  border: 3px solid black;
  background: #319cd6;
`;

const AccordionHeader = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-around;
`;

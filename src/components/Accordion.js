import React, { Component } from "react";
import styled from "styled-components";
import { Top100 } from "../constants/Top100";

import StockList from "./StockList";

export default class Accordion extends Component {
  render() {
    // TODO: Look into turning the accordion into a table element
    //Test
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
              key={idx}
              index={idx}
              name={stock.name}
              symbol={stock.symbol}
              //shares={shares} //TODO: # of Shares user owns
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

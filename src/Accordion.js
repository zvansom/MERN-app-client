import React, { Component } from 'react';
import styled from 'styled-components';
import { Top100 } from './Top100';

import StockList from './StockList';
export default class Accordion extends Component {
  state = {
    activeTab: null,
  }

  handleClick = e => {
    console.log(e.target.dataset.index)
  }

  render() {
    return (
      <AccordionWrapper>
        {Top100.map((stock, idx) => (
          <StockList 
            handleClick={this.handleClick} 
            key={idx} 
            index={idx}
            name={stock.name} 
          />) )}
      </AccordionWrapper>
    )
  }
}

const AccordionWrapper = styled.div`
  border: 3px solid red;
`;
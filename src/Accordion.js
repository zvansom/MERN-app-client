import React, { Component } from 'react';
import styled from 'styled-components';
import { Top100 } from './Top100';

import StockList from './StockList';
export default class Accordion extends Component {
  state = {
    activeTab: null,
  }

  handleClick = e => { 
    const index = e.target.dataset.index;
    this.setState({ activeTab: index === this.state.activeTab ? null : index})
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
            activeTab={this.state.activeTab}
          />) )}
      </AccordionWrapper>
    )
  }
}

const AccordionWrapper = styled.div`
  border: 3px solid red;
`;
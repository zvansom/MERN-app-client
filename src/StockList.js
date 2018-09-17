import React, { Component } from 'react';
import styled from 'styled-components';

export default class StockList extends Component {
  render() {
    return (
      <StockItem 
        onClick={this.props.handleClick}
      >
        <h2 data-index={this.props.index}>{this.props.name}</h2>
        <div className={(this.props.activeTab == this.props.index ? "active" : "")} >
          TESTING
        </div>
      </StockItem>
    )
  }
}

const StockItem = styled.div`
  border: 1px solid black;
  cursor: pointer;

  > div {
    height: 0;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
  }

  > div.active {
    height: 100px;
  }
`;
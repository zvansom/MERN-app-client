import React, { Component } from 'react';
import styled from 'styled-components';

export default class StockList extends Component {
  render() {
    return (
      <StockItem data-index={this.props.index} onClick={this.props.handleClick}>
        <h2>{this.props.name}</h2>
        <div className={"drawer" + (this.props.activeTab == this.props.index ? " active" : "")} >
          TESTING
        </div>
      </StockItem>
    )
  }
}

const StockItem = styled.div`
  border: 1px solid black;
  cursor: pointer;
  display: grid;
  justify-content: left;

  > h2 {
    margin-left: 40px;
  }
  > div.drawer {
    height: 0;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
  }

  > div.active {
    height: 100px;
  }
`;
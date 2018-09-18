import React, { Component } from 'react';
import styled from 'styled-components';


export default class StockList extends Component {
  state = {
    price: null,
  }
  
  async componentDidMount() {
    const url = `https://api.iextrading.com/1.0/stock/${this.props.symbol}/ohlc`
    const response = await fetch(url);
    const parse = await response.json();

    this.setState({
      price: parse.close.price,
    })
  }
  
  render() {
    return (
      <StockItem data-index={this.props.index} onClick={this.props.handleClick}>
        <h2>{this.props.name}</h2>
        <h2>{this.state.price}</h2>
        <div className={"drawer" + (this.props.activeTab == this.props.index ? " active" : "")} >
          THIS WOULD BE A COOL SPOT FOR A GRAPH!
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
  grid-template-columns: 1fr 1fr;

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
import React, { Component } from 'react'
import { Top100 } from './Top100';

import StockList from './StockList';
export default class Accordion extends Component {
  render() {
    return (
      <div>
        {Top100.map(stock => <StockList name={stock.name} />)}
      </div>
    )
  }
}

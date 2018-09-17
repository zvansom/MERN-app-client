import React, { Component } from 'react';
import styled from 'styled-components';

export default class StockList extends Component {
  render() {
    return (
      <div onClick={this.props.handleClick}>
        <h2 data-index={this.props.index}>{this.props.name}</h2>
      </div>
    )
  }
}

import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Import components
import ProgressBar from "./components/ProgressBar";
import StockTable from "./components/StockTable";
import LineChart from "./chart/LineChart";
import Trade from "./components/Trade";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      porfolio: [],
      workingCap: null,
      currentPrice: null,
      activeSymbol: '',
    };
  }

  handleClick = e => {
    console.log(e.target.dataset.currentprice);
    this.setState({ 
      activeSymbol: e.target.dataset.symbol,
      currentPrice: e.target.dataset.currentprice,
     });
  };

  render() {
    if (this.props.user) {
      return (
        <div>
          <ProgressBar workingCapital={110} portfolioTotal={90000} />
          <LineChart symbol={this.state.activeSymbol} currentPrice={this.state.currentPrice} />
          <Trade currentPrice={this.state.currentPrice} symbol={this.state.activeSymbol} />
          <h2>Buy some new stocks!</h2>
          <StockTable handleClick={this.handleClick} />
        </div>
      );
    }
    return <Redirect to="/" />;
  }
}

export default Profile;

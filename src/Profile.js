import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
// Import components
import ProgressBar from "./components/ProgressBar";
import StockTable from "./components/StockTable";
import LineChart from "./chart/LineChart";
import Trade from "./components/Trade";
import async from "async";

const SAMPLE_PORTFOLIO = [
  {
    symbol: "ATVI",
    numShares: 4,
    purchasePrice: null
  },
  {
    symbol: "GOOG",
    numShares: 4,
    purchasePrice: null
  }
];

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workingCap: null,
      currentPrice: null,
      activeSymbol: "ATVI"
    };
  }

  calculatePortfolioValue = portfolio => {
    let portfolioValue;
    //const symbols = portfolio.map(stock => stock.symbol);
    async.forEach(
      portfolio,
      function(stock, done) {
        const url = `https://api.iextrading.com/1.0/stock/${stock.symbol}/ohlc`;
        fetch(url)
          .then(response => response.json())
          .then(parse => {
            stock.purchasePrice = parse.close.price;
            done();
          });
      },
      function() {
        portfolioValue = portfolio.reduce((acc, stock) => {
          return (acc += stock.purchasePrice * stock.numShares);
        }, 0);
        console.log("portfolio", portfolio);
        console.log("portfolioValue", portfolioValue);
      }
    );
  };

  handleClick = e => {
    console.log(e.target.dataset.currentprice);
    this.setState({
      activeSymbol: e.target.dataset.symbol,
      currentPrice: e.target.dataset.currentprice
    });
  };

  render() {
    this.calculatePortfolioValue(SAMPLE_PORTFOLIO);
    console.log("SAMPLE_PORTFOLIO", SAMPLE_PORTFOLIO);
    if (this.props.user) {
      const { workingCapital, portfolio } = this.props;
      const { activeSymbol, currentPrice } = this.state;
      return (
        <div>
          <ProgressBar workingCapital={workingCapital} portfolio={portfolio} />
          <LineChart symbol={activeSymbol} />
          <Trade currentPrice={currentPrice} symbol={activeSymbol} />
          <h2>Buy some new stocks!</h2>
          <StockTable handleClick={this.handleClick} />
        </div>
      );
    }
    return <Redirect to="/" />;
  }
}

export default Profile;

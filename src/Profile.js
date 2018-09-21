import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import getCurrentValue from "./getCurrentValue";
// Import components
import ProgressBar from "./components/ProgressBar";
import StockTable from "./components/StockTable";
import LineChart from "./chart/LineChart";
import Trade from "./components/Trade";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workingCapital: 0,
      portfolio: [],
      currentPrice: null,
      activeSymbol: "ATVI",
      portfolioValue: 0,
      trade: "",
      shares: 0
    };
  }

  handleTradeSelection = e => {
    this.setState({ trade: e.target.value });
    // console.log("trade", this.state.trade);
  };

  handleShares = e => {
    e.preventDefault();
    this.setState({ shares: e.target.value });
    // console.log(this.state.shares);
  };

  hundleTrade = e => {
    e.preventDefault();

    let trade = this.state.trade;
    if (!trade) {
      return;
    }
    let shares = Number(this.state.shares);
    let symbol = this.state.activeSymbol;
    let tradeValue = this.state.currentPrice * shares;
    let newPortfolio = [...this.state.portfolio] || [{}];
    let newCapital = this.state.workingCapital;
    [newPortfolio, newCapital] = calculatePortfolio(
      trade,
      shares,
      symbol,
      newPortfolio,
      tradeValue,
      newCapital
    );
    this.setState({
      portfolio: newPortfolio,
      workingCaptal: newCapital,
      shares: 0,
      trade: ""
    });

    console.log("newPortfolio", newPortfolio);
    console.log("newWorkingCapital", newCapital);
    console.log("traded shares", this.state.shares);
  };

  async componentDidMount() {
    if (this.props.checkLogin && this.props.user) {
      const { workingCapital, portfolio } = this.props.user;
      let currentValues = await portfolio.map(stock =>
        getCurrentValue(stock).then(res => {
          let currentPortfolio = this.state.portfolioValue;
          currentPortfolio += res.price * res.numShares;
          this.setState({ portfolioValue: currentPortfolio });
        })
      );

      const url = `https://api.iextrading.com/1.0/stock/${
        this.state.activeSymbol
      }/ohlc`;
      const response = await fetch(url);
      const parse = await response.json();
      this.setState({
        workingCapital,
        portfolio,
        currentPrice: parse.close.price
      });
    }
  }

  handleClick = e => {
    console.log(e.target.dataset.price);
    this.setState({
      activeSymbol: e.target.dataset.symbol,
      currentPrice: e.target.dataset.price
    });
  };

  render() {
    console.log("render");
    console.log("USER", this.props.user);
    if (!this.props.checkLogin) {
      console.log("user login not finished yet");
      return null;
    } else if (!this.props.user) {
      console.log("no user");
      return <Redirect to="/" />;
    } else {
      console.log("user is here");
      const {
        activeSymbol,
        currentPrice,
        trade,
        shares,
        portfolio
      } = this.state;

      return (
        <div>
          <ProgressBar portfolioValue={this.state.portfolioValue} />
          <p>
            Portfolio Value <b>${this.state.portfolioValue}</b> | Cash on hand $
            {this.state.workingCapital}
          </p>
          <LineChart symbol={activeSymbol} />
          <Trade
            portfolio={portfolio}
            currentPrice={currentPrice}
            symbol={activeSymbol}
            trade={trade}
            shares={shares}
          />

          <h2>Buy some new stocks!</h2>
          <StockTable handleClick={this.handleClick} />
        </div>
      );
    }
  }
}

export default Profile;

// Helpers
function calculatePortfolio(
  trade,
  shares,
  symbol,
  newPortfolio,
  tradeValue,
  newCapital
) {
  if (trade === "Sell") {
    newCapital += tradeValue;
    newPortfolio.forEach(stock => {
      if (stock.symbol === symbol) {
        stock.numShares -= shares;
      }
    });
  } else {
    newCapital -= tradeValue;
    var ownedShares = newPortfolio.find(function(stock) {
      return stock.symbol === symbol;
    });

    let newSahres = ownedShares
      ? (ownedShares.numShares += shares)
      : {
          symbol: symbol,
          numShares: shares
        };

    newPortfolio.push(newSahres);
  }
  return [newPortfolio, newCapital];
}

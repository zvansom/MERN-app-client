import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import getCurrentValue from "./getCurrentValue";
// Import components
import ProgressBar from "./components/ProgressBar";
import StockTable from "./components/StockTable";
import LineChart from "./chart/LineChart";
import Trade from "./components/Trade";

import { SERVER_URL } from "./constants/globals";
import axios from "axios";

const INITIALCAPITAL = 100000;

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
  };

  incrementShares = e => {
    e.preventDefault();
    this.setState({ shares: this.state.shares + 1 });
  };

  decreaseShares = e => {
    e.preventDefault();
    if (this.state.shares > 0) {
      this.setState({ shares: this.state.shares - 1 });
    }
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
    const currentPortfolioValue = this.state.portfolioValue;
    const oldCapital =
      this.state.workingCapital + Number(currentPortfolioValue);

    [newPortfolio, newCapital] = calculatePortfolio(
      trade,
      shares,
      symbol,
      newPortfolio,
      tradeValue,
      newCapital
    );
    this.setState({
      portfolio: [...newPortfolio],
      workingCapital: newCapital,
      portfolioValue: (oldCapital - newCapital).toFixed(2),
      shares: 0,
      trade: ""
    });

    axios.put(`${SERVER_URL}/users/${this.props.user.id}`, {
      portfolio: newPortfolio,
      workingCapital: newCapital
    });
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
    this.setState({
      activeSymbol: e.target.dataset.symbol,
      currentPrice: e.target.dataset.price
    });
  };

  render() {
    if (!this.props.checkLogin) {
      return null;
    } else if (!this.props.user) {
      return <Redirect to="/" />;
    } else {
      const {
        activeSymbol,
        currentPrice,
        trade,
        shares,
        portfolio
      } = this.state;

      let buyMax = Math.floor(this.state.workingCapital / currentPrice);

      let ownedShares = portfolio.find(stock => stock.symbol === activeSymbol);
      const tradeArray = ownedShares ? ["Buy", "Sell"] : ["Buy"];
      let sellMax = ownedShares ? ownedShares.numShares : "";
      const max = trade === "" ? 0 : trade === "Sell" ? sellMax : buyMax;
      //this.setTrademax(max);
      return (
        <div>
          <ProgressBar
            portfolioValue={this.state.portfolioValue}
            workingCapital={this.state.workingCapital}
            initialCapital={INITIALCAPITAL}
          />
          <p>
            Portfolio Value <b>${this.state.portfolioValue}</b> | Cash on hand{" "}
            <b>${this.state.workingCapital.toFixed(2)}</b>
          </p>
          <LineChart symbol={activeSymbol} />
          <Trade
            max={max}
            currentPrice={currentPrice}
            trade={trade}
            shares={shares}
            decreaseShares={this.decreaseShares}
            incrementShares={this.incrementShares}
            handleTradeSelection={this.handleTradeSelection}
            hundleTrade={this.hundleTrade}
            tradeArray={tradeArray}
          />

          <h2>Buy some new stocks!</h2>
          <StockTable handleClick={this.handleClick} />
        </div>
      );
    }
  }
}

export default Profile;

// ///// Helpers
function calculatePortfolio(
  trade,
  shares,
  symbol,
  newPortfolio,
  tradeValue,
  newCapital
) {
  var ownedShares = newPortfolio.find(function(stock) {
    return stock.symbol === symbol;
  });

  let sell = trade === "Sell";
  newCapital = sell ? (newCapital += tradeValue) : (newCapital -= tradeValue);

  let newNumShares =
    sell && ownedShares.numShares > shares
      ? (ownedShares.numShares -= shares)
      : ownedShares
        ? (ownedShares.numShares += shares)
        : shares;

  if (ownedShares) {
    ownedShares.numShares = newNumShares;
  } else {
    newPortfolio.push({
      symbol: symbol,
      numShares: shares
    });
  }

  newPortfolio = newPortfolio.filter(function(stock) {
    return stock.numShares !== 0;
  });
  return [newPortfolio, newCapital];
}

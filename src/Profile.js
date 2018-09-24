import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import getCurrentValue from "./getCurrentValue";

// Import components
import ProgressBar from "./components/ProgressBar";
import StockTable from "./components/StockTable";
import LineChart from "./chart/LineChart";
import TradeForm from "./components/TradeForm";

import { calculatePortfolio } from './Utilities/calculatePortfolio';


import { SERVER_URL, STARTING_CAPITAL } from "./constants/globals";
import axios from "axios";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workingCapital: 0,
      portfolio: [],
      currentPrice: null,
      activeSymbol: "ATVI",
      portfolioValue: 0,
      userOwnsIndex: null,
      tradeType: 'Buy',
      shares: 0
    };
  }

  handleTradeSelection = e => {
    if (this.state.userOwnsIndex >= 0) {
      this.setState({ tradeType: e.target.value});
    }
  };

  incrementShares = e => {
    const { shares, currentPrice, workingCapital, portfolio, userOwnsIndex } = this.state;
    e.preventDefault();
    if ( this.state.tradeType === 'Sell' ) {
      // Prevent user from selling more shares then they own
      if ( portfolio[userOwnsIndex].numShares >= shares ) {
        this.setState({ shares: this.state.shares + 1 });
      }
    } else if (shares * currentPrice < workingCapital) {
      // Prevent user from buying more shares then they can afford
      this.setState({ shares: this.state.shares + 1 });
    }
  };

  decreaseShares = e => {
    const { shares } = this.state;
    if (shares > 0 ) {
      this.setState({ shares: shares - 1 });
    }
  };

  handleTrade = e => {
    e.preventDefault();
    // Make sure at least 1 share is being traded.
    if (this.state.shares > 0) {
      const { shares, tradeType, activeSymbol, portfolio, userOwnsIndex } = this.state;
      
      // Make new items to be set in state.
      let newPortfolio = [...portfolio];    
      let newWorkingCapital = this.state.workingCapital
      let newPortfolioValue = this.state.portfolioValue;

      // Calculate the trade value
      const tradeValue = this.state.currentPrice * shares;

      if (tradeType === 'Buy') {

        // Handle case for user buying more shares of already owned stock
        if (userOwnsIndex >= 0) {
          newPortfolio[userOwnsIndex].numShares += shares;
        } else {
          // Add new stock to portfolio
          const newStock = {
            symbol: activeSymbol,
            numShares: shares
          }
          newPortfolio.push(newStock);
        }

        // Calculate changes to working capital and portfolio value
        newWorkingCapital -= tradeValue;
        newPortfolioValue += tradeValue;

      } else if (tradeType === 'Sell') {
        newPortfolio[userOwnsIndex].numShares -= shares;

        // If user has sold all shares of a stock, remove it from the portfolio
        if (newPortfolio[userOwnsIndex].numShares === 0) {
          newPortfolio.splice(userOwnsIndex, 1);
        }
        // Calculate changes to working capital and portfolio value
        newWorkingCapital += tradeValue;
        newPortfolioValue -= tradeValue;
      }

      // Reset form state to initial and update portfolio and capital
      this.setState({
        portfolio: newPortfolio,
        portfolioValue: newPortfolioValue,
        workingCapital: newWorkingCapital,
        shares: 0,
        tradeType: 'Buy',
      });

      axios.put(`${SERVER_URL}/users/${this.props.user.id}`, {
        portfolio: newPortfolio,
        workingCapital: newWorkingCapital
      });
    }
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
        currentPrice: parse.close.price,
        userOwnsIndex: portfolio.findIndex(stock => stock.symbol === this.state.activeSymbol),
      });
    }
  }

  handleClick = e => {
    this.setState({
      activeSymbol: e.target.dataset.symbol,
      currentPrice: e.target.dataset.price,
      tradeType: 'Buy',
      userOwnsIndex: this.state.portfolio.findIndex(stock => stock.symbol === e.target.dataset.symbol),
    });
  };

  render() {
    if (!this.props.checkLogin) {
      return null;
    } else if (!this.props.user) {
      return <Redirect to="/" />;
    } else {
      const { activeSymbol, currentPrice, tradeType, shares, portfolio } = this.state;

      return (
        <div>
          <ProgressBar
            portfolioValue={this.state.portfolioValue}
            workingCapital={this.state.workingCapital}
            initialCapital={STARTING_CAPITAL}
          />
          <p>
            Portfolio Value <b>${this.state.portfolioValue}</b> | Cash on hand{" "}
            <b>${this.state.workingCapital.toFixed(2)}</b>
          </p>
          <LineChart symbol={activeSymbol} />
          <TradeForm
            userOwns={this.state.userOwnsIndex}
            trade={tradeType}
            handleTradeSelection={this.handleTradeSelection}
            shares={shares}
            currentPrice={currentPrice}
            decreaseShares={this.decreaseShares}
            incrementShares={this.incrementShares}
            handleTrade={this.handleTrade}
          />
          <StockTable handleClick={this.handleClick} />
        </div>
      );
    }
  }
}

export default Profile;

// ///// Helpers

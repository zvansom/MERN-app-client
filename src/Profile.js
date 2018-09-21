import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import getCurrentValue from "./getCurrentValue";
// Import components
import ProgressBar from "./components/ProgressBar";
import StockTable from "./components/StockTable";
import LineChart from "./chart/LineChart";
import Trade from "./components/Trade";

const SAMPLE_PORTFOLIO = [
  {
    symbol: "ATVI",
    numShares: 4
  },
  {
    symbol: "GOOG",
    numShares: 60
  }
];

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workingCap: null,
      currentPrice: null,
      activeSymbol: "ATVI",
      portfolioValue: 0,
      history: SAMPLE_PORTFOLIO
    };
  }
  // handlePortfolio = e => {
  //   const history = this.state.history;
  //   const current = history[history.length - 1];
  //   const squares = current.squares.slice();

  //   squares[i] = this.state.xIsNext ? 'X' : 'O';
  //   this.setState({
  //     history: history.concat([{
  //       trade: trade
  //     }]),
  //     xIsNext: !this.state.xIsNext,
  //   });
  // };

  async componentDidMount() {
    let currentValues = await SAMPLE_PORTFOLIO.map(stock =>
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
      currentPrice: parse.close.price
    });
  }

  handleClick = e => {
    console.log(e.target.dataset.price);
    this.setState({
      activeSymbol: e.target.dataset.symbol,
      currentPrice: e.target.dataset.price
    });
  };

  render() {
    if (this.props.user) {
      const { workingCapital, portfolio } = this.props;
      const { activeSymbol, currentPrice } = this.state;
      const workingCapitalTemp = 80000;
      return (
        <div>
          <ProgressBar
            portfolioValue={this.state.portfolioValue}
            workingCapital={workingCapitalTemp}
          />
          <p>
            Portfolio Value <b>${this.state.portfolioValue}</b> | Cash on hand $
            <b>{workingCapitalTemp}</b>
          </p>
          <LineChart symbol={activeSymbol} />
          <Trade
            portfolio={SAMPLE_PORTFOLIO}
            currentPrice={this.state.currentPrice}
            symbol={activeSymbol}
            workingCapital={workingCapitalTemp}
          />
          <h2>Buy some new stocks!</h2>
          <StockTable handleClick={this.handleClick} />
        </div>
      );
    }
    return <Redirect to="/" />;
  }
}

export default Profile;

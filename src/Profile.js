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
    numShares: 4000
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
      portfolioValue: 0
    };
  }

  async componentDidMount() {
    let currentValues = await SAMPLE_PORTFOLIO.map(stock =>
      getCurrentValue(stock).then(res => {
        let currentPortfolio = this.state.portfolioValue;
        currentPortfolio += res.price * res.numShares;
        this.setState({ portfolioValue: currentPortfolio });
      })
    );
  }

  handleClick = e => {
    console.log(e.target.dataset.currentprice);
    this.setState({
      activeSymbol: e.target.dataset.symbol,
      currentPrice: e.target.dataset.currentprice
    });
  };

  render() {
    if (this.props.user) {
      const { workingCapital, portfolio } = this.props;
      const { activeSymbol, currentPrice } = this.state;
      return (
        <div>
          <h2>
            Current Portfolio Value: ${this.state.portfolioValue.toFixed(2)}
          </h2>
          <LineChart symbol={activeSymbol} />
          <Trade
            portfolio={SAMPLE_PORTFOLIO}
            user={this.props.user}
            currentPrice={currentPrice}
            symbol={activeSymbol}
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

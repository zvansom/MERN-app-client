import React, { Component } from "react";
import Chart from "chart.js";
import styled from "styled-components";

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeFrame: 30,
      data: []
    };
  }

  shouldComponentUpdate(nextProp, nextState) {
    if (nextProp.symbol !== this.props.symbol) {
      this.fetchData(nextProp.symbol);
      return true;
    }
    return false;
  }

  fetchData = symbol => {
    const url = `https://api.iextrading.com/1.0/stock/${symbol}/chart/1y`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const latestPrice = {
          date: new Date()
        };
        this.setState(
          {
            data
            //.slice(data.length - this.state.timeFrame),
            // data: data.slice(data.length - 90),
            // data: data
          },
          () => {
            this.drawGraph(data.slice(data.length - this.state.timeFrame));
          }
        );
      })
      .catch(ex => {
        console.log("An error occurred while parsing data", ex);
      });
  };

  handleClick = e => {
    const { data } = this.state;
    this.setState({
      timeFrame: parseInt(e.target.value)
    });
    this.drawGraph(data.slice(data.length - e.target.value));
    console.log(e.target.value);
  };

  componentDidMount() {
    this.fetchData(this.props.symbol);
  }

  drawGraph = data => {
    const labels = data.map(point => {
      return point.label;
    });
    const closePrices = data.map(point => {
      return point.close;
    });
    closePrices.push(this.props.currentPrice);
    var ctx = document.getElementById("lineChart");
    var lineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: this.props.symbol,
            fill: false,
            borderJoinStyle: "round",
            data: closePrices,
            backgroundColor: [
              "rgba(87, 188, 144, 1)"
              // 'rgba(255, 99, 132, 0.2)',
              // 'rgba(54, 162, 235, 0.2)',
              // 'rgba(255, 206, 86, 0.2)',
              // 'rgba(75, 192, 192, 0.2)',
              // 'rgba(153, 102, 255, 0.2)',
              // 'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              "rgba(1, 82, 73, .5)"
              // 'rgba(255,99,132,1)',
              // 'rgba(54, 162, 235, 1)',
              // 'rgba(255, 206, 86, 1)',
              // 'rgba(75, 192, 192, 1)',
              // 'rgba(153, 102, 255, 1)',
              // 'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 2
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                beginAtZero: false,
                maxTicksLimit: 6,
                fontSize: 12,
                callback: function(value, index, values) {
                  return `$` + value;
                }
              }
            }
          ]
        }
      }
    });
  };

  render() {
    return (
      <LineCanvas>
        <h2>{this.props.symbol}</h2>
        <canvas id="lineChart" />
        <div>
          <button type="button" value={30} onClick={this.handleClick}>
            1M
          </button>
          <button type="button" value={90} onClick={this.handleClick}>
            3M
          </button>
          <button type="button" value={180} onClick={this.handleClick}>
            6M
          </button>
        </div>
      </LineCanvas>
    );
  }
}

export default LineChart;

const LineCanvas = styled.div`
  color: #015249
  margin-top: 10px;
  margin-bottom: 30px;
  width: auto;
`;

import React, { Component } from 'react';
import Chart from 'chart.js';
import styled from 'styled-components';

class LineChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
    }
  }

  shouldComponentUpdate(nextProp, nextState) {
    if(nextProp.symbol !== this.props.symbol){
      this.fetchData(nextProp.symbol);
      return true;
    }
    return false;
  }

  fetchData = symbol => {
    const url = `https://api.iextrading.com/1.0/stock/${
      symbol
    }/chart/1m`;
    fetch(url)
      .then((response) => {
        return response.json()
      }).then((data) =>{
        const latestPrice = {
          date: new Date()
        }
        // console.log('one week data', data.slice(data.length - 7))
          this.setState({
            data: data //.slice(data.length - 7) last 7 days
          }, () => {
            this.drawGraph();
          });
      }).catch((ex) => {
        console.log('An error occurred while parsing data', ex)
      })
  }

  componentDidMount() {
    this.fetchData(this.props.symbol);
  }

  drawGraph = () => {
    const labels = this.state.data.map(point => {
      return point.label
    })
    const closePrices = this.state.data.map(point => {
      return point.close
    })
    closePrices.push(this.props.currentPrice)
    // console.log('labels only', labels)
    // console.log('close prices', closePrices)
    var ctx = document.getElementById("lineChart");
    var lineChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: this.props.symbol,
              fill: false,
              borderJoinStyle: 'round',
              data: closePrices,
              backgroundColor: [
                  'rgba(87, 188, 144, 1)',
                  // 'rgba(255, 99, 132, 0.2)',
                  // 'rgba(54, 162, 235, 0.2)',
                  // 'rgba(255, 206, 86, 0.2)',
                  // 'rgba(75, 192, 192, 0.2)',
                  // 'rgba(153, 102, 255, 0.2)',
                  // 'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(1, 82, 73, .5)',
                  // 'rgba(255,99,132,1)',
                  // 'rgba(54, 162, 235, 1)',
                  // 'rgba(255, 206, 86, 1)',
                  // 'rgba(75, 192, 192, 1)',
                  // 'rgba(153, 102, 255, 1)',
                  // 'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 2
          }]
      },
      options: {
          legend: {
            display:false
          },
          scales: {
              xAxes: [{
                  gridLines: {
                      display:false
                  }
              }],
              yAxes: [{
                  gridLines: {
                    display:false
                  },
                  ticks: {
                      beginAtZero:false,
                      maxTicksLimit: 6,
                      fontSize: 12,
                      callback: function(value, index, values) {
                        return `$` + value;
                      }
                  }
              }]
          },
        }
      });
    }

  render() {
    return(
      <LineCanvas>
        <h2>{this.props.symbol}</h2>
        <canvas id="lineChart"></canvas>
      </LineCanvas>
      );
  }
}

export default LineChart;

const LineCanvas = styled.div`
  width: 800px;
  height: auto; 
`;









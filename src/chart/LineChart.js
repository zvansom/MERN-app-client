import React, { Component } from 'react';
import Chart from 'chart.js';
import styled from 'styled-components';

// API data
import { Top100 } from '../constants/Top100';
import StockList from '../components/StockList';


class LineChart extends Component {
  componentDidMount() {
	var ctx = document.getElementById("lineChart");
	var lineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [{
            label: this.props.symbol,
            fill: false,
            borderJoinStyle: 'round',
            data: [2, 19, 3, 5, 2, 3, 10],
            backgroundColor: [
            		'rgba(87, 188, 144, 1)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
            		'rgba(1, 82, 73, .9)',
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
	});
}

  render() {
    return(
    	  <LineCanvas>
	       <canvas id="lineChart"></canvas>
        </LineCanvas>
      );
  }
}

export default LineChart;

const LineCanvas = styled.div`
  width: 600px;
  height: auto; 
`;









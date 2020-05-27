import React, { Component } from "react";
import Plot from "react-plotly.js";
// import {
//   Label,
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ReferenceArea
// } from "recharts";

class Stock extends Component {
  constructor(props) {
    super(props);

    // this._isMounted = false;

    this.state = {
      StockSymbol: "GOOG",
      stockChartXValues: [],
      closeYValues: [],
      openYValues: [],
      highYValues: [],
      lowYValues: []
      // Recharts stuff
    };

    // this.textchange = {
    //   onTextboxChangeStockTicker: this.onTextboxChangeStockTicker.bind(this)
    // };

    // this.useraction = {
    //   onChangeStockTicker: this.onChangeStockTicker.bind(this)
    // };
  }

  //   onTextboxChangeStockTicker(event) {
  //     this.setState({
  //       StockSymbol: event.target.value
  //     });
  //   }

  //   onSignUp() {
  //     // Grab state
  //     const { StockSymbol } = this.state;

  //     this.setState({
  //       StockSymbol: onChangeStockTicker
  //     });
  //   }

  componentDidMount() {
    // this._isMounted = true;
    this.fetchStock();
  }

  //   componentWillUnmount() {
  //     this._isMounted = false;
  //   }

  fetchStock() {
    const pointerToThis = this;
    console.log(pointerToThis);
    const API_KEY = process.env.API_KEY;
    // Make stock symbol into a state that user can type in and enter
    // let StockSymbol = "AMZN";
    // Make the output size toggable and then feed this as a variable
    let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${this.state.StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    let stockChartXValuesFunction = [];
    let closeYValuesFunction = [];
    let openYValuesFunction = [];
    let highYValuesFunction = [];
    let lowYValuesFunction = [];

    fetch(API_CALL)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);

        for (var key in data["Time Series (Daily)"]) {
          stockChartXValuesFunction.push(key);
          // Adjust this to get any more data fields
          closeYValuesFunction.push(data["Time Series (Daily)"][key]["4. close"]);
          openYValuesFunction.push(data["Time Series (Daily)"][key]["1. open"]);
          highYValuesFunction.push(data["Time Series (Daily)"][key]["2. high"]);
          lowYValuesFunction.push(data["Time Series (Daily)"][key]["3. low"]);

          // console.log(stockChartXValuesFunction);
          pointerToThis.setState({
            stockChartXValues: stockChartXValuesFunction,
            closeYValues: closeYValuesFunction,
            openYValues: openYValuesFunction,
            highYValues: highYValuesFunction,
            lowYValues: lowYValuesFunction
          });
        }
      });
  }

  //   onStockSymbolChange(event) {
  //     this.setState({
  //       StockSymbol: event.target.value
  //     });
  //   }

  /*--------------------------------
  *  Recharts functions 
  --------------------------------*/

  //

  render() {
    return (
      <>
        <div className="col-md-12 col-lg-4">
            <h1>Stock Data</h1>
            <ul>
                <li>{this.state.StockSymbol}</li>
            </ul>
        </div>
        <div className="col-md-12 col-lg-8">
          <h2>Analyse Stock Data</h2>
          <h5>Symbol: {this.state.StockSymbol}</h5>
          <p>Past 100 days Daily Time Series showing open, close, high, low price.</p>
          <Plot
            data={[
              {
                type: "candlestick",
                close: this.state.closeYValues,
                open: this.state.openYValues,
                high: this.state.highYValues,
                low: this.state.lowYValues,
                x: this.state.stockChartXValues,
                increasing: { line: { color: "green" } },
                decreasing: { line: { color: "red" } }
              }
            ]}
            layout={{
              width: 720,
              height: 440,
              title: {
                text: `Past 100 Days Daily Time Series`,
                font: {
                  family: "Poppins",
                  size: 20,
                  color: `#3e3e3e`
                }
              }
            }}
          />
          <br />
        </div>
      </>
    );
  }
}

export default Stock;

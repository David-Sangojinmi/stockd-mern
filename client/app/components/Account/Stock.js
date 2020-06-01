import React, { Component } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import SearchBar from "./SearchBar";

class Stock extends Component {
  constructor(props) {
    super(props);

    // this._isMounted = false;

    this.state = {
      stockChartXValues: [],
      closeYValues: [],
      openYValues: [],
      highYValues: [],
      lowYValues: [],
      chartName: [],
      Symbol: [],
      lastRefreshed: [],

      // For searchable
      StockTicker: null,
      Value: ""
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      Value: event.target.value
    });
  }

  handleClick(event) {
    if (event) event.preventDefault();
    this.setState({
      Value: "",
      StockTicker: this.state.Value
    });

    // const RAPID_API_KEY = "${process.env.RAPID_API_KEY}";
    // const AV_API_KEY = process.env.AV_API_KEY;
    let API_KEY = this.state.RAPID_API_KEY;
    let StockSymbol = this.state.Value;

    // Make the output size toggable and then feed this as a variable
    let stockChartXValuesFunction = [];
    let closeYValuesFunction = [];
    let openYValuesFunction = [];
    let highYValuesFunction = [];
    let lowYValuesFunction = [];
    let chartNameFunction = [];
    let SymbolFunction = [];
    let lastRefreshedFunction = [];

    axios({
      method: "GET",
      url: "https://alpha-vantage.p.rapidapi.com/query",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
        "x-rapidapi-key": "ffe26f8252msh9f89e69954ac6b9p1164bejsn5d8cd74943f0",
        useQueryString: true
      },
      params: {
        symbol: StockSymbol,
        function: "TIME_SERIES_DAILY_ADJUSTED"
      }
    })
      .then(response => {
        console.log(response.data);

        for (var key in response.data["Time Series (Daily)"]) {
          stockChartXValuesFunction.push(key);
          // Adjust this to get any more data fields
          closeYValuesFunction.push(response.data["Time Series (Daily)"][key]["4. close"]);
          openYValuesFunction.push(response.data["Time Series (Daily)"][key]["1. open"]);
          highYValuesFunction.push(response.data["Time Series (Daily)"][key]["2. high"]);
          lowYValuesFunction.push(response.data["Time Series (Daily)"][key]["3. low"]);

          this.setState({
            stockChartXValues: stockChartXValuesFunction,
            closeYValues: closeYValuesFunction,
            openYValues: openYValuesFunction,
            highYValues: highYValuesFunction,
            lowYValues: lowYValuesFunction
          });
        }

        chartNameFunction.push(response.data["Meta Data"]["1. Information"]);
        lastRefreshedFunction.push(response.data["Meta Data"]["3. Last Refreshed"]);
        SymbolFunction.push(response.data["Meta Data"]["2. Symbol"]);
        this.setState({
          chartName: chartNameFunction,
          Symbol: SymbolFunction,
          lastRefreshed: lastRefreshedFunction
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  //   componentDidMount() {
  //     // this._isMounted = true;
  //     this.fetchStock();
  //   }

  //   componentWillUnmount() {
  //     // this._isMounted = false;
  //   }

  render() {
    const Value = this.state.Value;

    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-4 gray-bg-1">
              <h3>Companies</h3>
              <p>AAPL</p>
              <p>AMZN</p>
              <p>FB</p>
              <p>GOOG</p>
              <p>
                <strong>Current:</strong> <span id="coloured">{this.state.Symbol}</span>
              </p>
            </div>
            <div className="col-md-12 col-lg-8 gray-bg-1">
              <h4>Analyse Stock Data</h4>
              <SearchBar value={Value} onChange={this.handleChange} onClick={this.handleClick} />
              <h5>Symbol: {this.state.Symbol}</h5>
              <p>Last refreshed: {this.state.lastRefreshed}</p>
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
                  width: 700,
                  height: 440,
                  title: {
                    text: `${this.state.chartName}`,
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
          </div>
        </div>
      </>
    );
  }
}

export default Stock;

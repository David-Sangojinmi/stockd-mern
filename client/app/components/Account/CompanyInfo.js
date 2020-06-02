import React, { Component } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";

class CompanyInfo extends Component {
  constructor(props) {
    super(props);

    // this._isMounted = false;

    this.state = {
      // Company information variables here
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

    let RAPID_API_KEY = "ffe26f8252msh9f89e69954ac6b9p1164bejsn5d8cd74943f0";
    let StockSymbol = this.state.Value;

    // Function to get the company info and update the states
    let SymbolFunction = [];
    let lastRefreshedFunction = [];

    axios({
      method: "GET",
      url: "https://alpha-vantage.p.rapidapi.com/query",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
        "x-rapidapi-key": RAPID_API_KEY,
        useQueryString: true
      },
      params: {
        symbol: StockSymbol,
        function: "TIME_SERIES_DAILY_ADJUSTED"
      }
    })
      .then(response => {
        console.log(response.data);
        console.log(`${process.env.RAPID_API_KEY}`);

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

export default CompanyInfo;

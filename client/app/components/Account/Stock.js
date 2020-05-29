import React, { Component } from "react";
import Plot from "react-plotly.js";
import axios from "axios";

class Stock extends Component {
  constructor(props) {
    super(props);

    // this._isMounted = false;

    this.state = {
      StockSymbol: "LON:AZN",
      stockChartXValues: [],
      closeYValues: [],
      openYValues: [],
      highYValues: [],
      lowYValues: [],
      lastRefreshed: []

      // For searchable
      // StockTicker: null,
      // Value: ""
    };

    // this.handleClick = this.handleClick.bind(this);
    // this.handleChange = thishandleChange.bind(this);
  }

//   handleChange(e) {
//     this.setState({
//       Value: e.target.value
//     });
//   }

//   handleClick(e) {
//     if (e) e.preventDefault();
//     this.setState({
//       Value: "",
//       StockTicker: this.state.Value
//     });

//     let StockTicker = this.state.value;
//     const key = "F41ON15LGCFM4PR7";
//     const url = `https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${term}&apikey=${key}`;

//     this.fetchStock();
//   }

  componentDidMount() {
    // this._isMounted = true;
    this.fetchStock();
  }

  componentWillUnmount() {
    // this._isMounted = false;
  }

  fetchStock() {
    const pointerToThis = this;
    console.log(pointerToThis);
    const API_KEY = process.env.API_KEY;
    // Make stock symbol into a state that user can type in and enter

    // Make the output size toggable and then feed this as a variable
    let stockChartXValuesFunction = [];
    let closeYValuesFunction = [];
    let openYValuesFunction = [];
    let highYValuesFunction = [];
    let lowYValuesFunction = [];
    let lastRefreshedFunction = [];

    // fetch(API_CALL)
    //   .then(function(response) {
    //     return response.json();
    //   })
    //   .then(function(data) {
    //       console.log(data);

    //     for (var key in data["Time Series (Daily)"]) {
    //       stockChartXValuesFunction.push(key);
    //       // Adjust this to get any more data fields
    //       closeYValuesFunction.push(data["Time Series (Daily)"][key]["4. close"]);
    //       openYValuesFunction.push(data["Time Series (Daily)"][key]["1. open"]);
    //       highYValuesFunction.push(data["Time Series (Daily)"][key]["2. high"]);
    //       lowYValuesFunction.push(data["Time Series (Daily)"][key]["3. low"]);

    //       // console.log(stockChartXValuesFunction);
    //       if (this._isMounted) {
    //         pointerToThis.setState({
    //             stockChartXValues: stockChartXValuesFunction,
    //             closeYValues: closeYValuesFunction,
    //             openYValues: openYValuesFunction,
    //             highYValues: highYValuesFunction,
    //             lowYValues: lowYValuesFunction
    //         });
    //       }
    //     }
    //   });

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
        symbol: this.state.StockSymbol,
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

          pointerToThis.setState({
            stockChartXValues: stockChartXValuesFunction,
            closeYValues: closeYValuesFunction,
            openYValues: openYValuesFunction,
            highYValues: highYValuesFunction,
            lowYValues: lowYValuesFunction
          });
        }

        lastRefreshedFunction.push(response.data["Meta Data"]["3. Last Refreshed"]);
        pointerToThis.setState({
          lastRefreshed: lastRefreshedFunction
        });
      })
      .catch(error => {
        console.log(error);
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
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-4 gray-bg-1">
              <h3>Companies</h3>
              <p>AAPL</p>
              <p>AMZN</p>
              <p>FB</p>
              <p>GOOG</p>
              <p>
                <strong>Current:</strong> <span id="coloured">{this.state.StockSymbol}</span>
              </p>
            </div>
            <div className="col-md-12 col-lg-8 gray-bg-1">
              <h4>Analyse Stock Data</h4>
              <h5>Symbol: {this.state.StockSymbol}</h5>
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
          </div>
        </div>
      </>
    );
  }
}

export default Stock;

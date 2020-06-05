import React, { Component } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";

class CompanyInfo extends Component {
  constructor(props) {
    super(props);

    // this._isMounted = false;

    this.state = {
      Symbol: [],

      Fullname: [],
      Currency: [],
      Country: [],
      Sector: [],
      Industry: [],
      Summary: [],
      StockPrice: [],
      Headquarters: [],
      NumberOfEmployees: [],
      Website: [],

      // For searchable
      // TickerSymbol: null,
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
      Value: ""
      // TickerSymbol: this.state.Value
    });

    let RAPID_API_KEY = "ffe26f8252msh9f89e69954ac6b9p1164bejsn5d8cd74943f0";
    let Symbol = this.state.Value;

    let SymbolFunction = [];
    let FullnameFunction = [];
    let CurrencyFunction = [];
    let CountryFunction = [];
    let SectorFunction = [];
    let IndustryFunction = [];
    let SummaryFunction = [];
    let StockPriceFunction = [];
    let HeadquartersFunction = [];
    let NumberOfEmployeesFunction = [];
    let WebsiteFunction = [];

    axios({
      method: "GET",
      url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-profile",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": RAPID_API_KEY,
        useQueryString: true
      },
      params: {
        symbol: Symbol
      }
    })
      .then(response => {
        console.log(response.data);

        FullnameFunction.push(response.data["price"]["longName"]);
        CurrencyFunction.push(response.data["price"]["currencySymbol"]);
        CountryFunction.push(response.data["assetProfile"]["country"]);
        SectorFunction.push(response.data["assetProfile"]["sector"]);
        IndustryFunction.push(response.data["assetProfile"]["industry"]);
        SymbolFunction.push(response.data["symbol"]);
        SummaryFunction.push(response.data["assetProfile"]["longBusinessSummary"]);
        StockPriceFunction.push(response.data["price"]["regularMarketPrice"]["raw"]);
        HeadquartersFunction.push(response.data["assetProfile"]["address1"]);
        HeadquartersFunction.push(response.data["assetProfile"]["address2"]);
        HeadquartersFunction.push(response.data["assetProfile"]["city"]);
        HeadquartersFunction.push(response.data["assetProfile"]["zip"]);

        NumberOfEmployeesFunction.push(response.data["assetProfile"]["fullTimeEmployees"]);
        WebsiteFunction.push(response.data["assetProfile"]["website"]);

        this.setState({
          Fullname: FullnameFunction,
          Currency: CurrencyFunction,
          Country: CountryFunction,
          Sector: SectorFunction,
          Industry: IndustryFunction,
          Symbol: SymbolFunction,
          Summary: SummaryFunction,
          StockPrice: StockPriceFunction,
          Headquarters: HeadquartersFunction,
          NumberOfEmployees: NumberOfEmployeesFunction,
          Website: WebsiteFunction
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
            <div className="col-md-12 col-lg-4 dashboard-bg">
              <h3>Companies</h3>
              <p>AAPL</p>
              <p>AMZN</p>
              <p>FB</p>
              <p>GOOG</p>
              {/* <p>
                <strong>Current:</strong> <span id="coloured">{this.state.Symbol}</span>
              </p> */}
            </div>
            <div className="col-md-12 col-lg-8 dashboard-bg">
              <div className="row">
                <div className="col-md-12 col-lg-6">
                  <h4>Find Company Information</h4>
                </div>
                <div className="col-md-12 col-lg-6">
                  <SearchBar
                    value={Value}
                    onChange={this.handleChange}
                    onClick={this.handleClick}
                  />
                </div>
              </div>
              <section className="dashboard-section">
                <div className="container">
                  <h2>{this.state.Fullname}</h2>
                  {/* <p>
                    Stock Price: {this.state.Currency} {this.state.StockPrice}
                  </p> */}
                  <div className="row">
                    <div className="col-md-12 col-lg-6">
                      <p>
                        <strong>Address:</strong> {this.state.Headquarters[0]}
                        {", "}
                        {this.state.Headquarters[1]}
                        {", "}
                        {this.state.Headquarters[2]}
                        {" "}
                        {this.state.Headquarters[3]}
                      </p>
                      <p>
                        <strong>Country:</strong> {this.state.Country}
                      </p>
                      <strong>Website:</strong>{" "}
                      <span id="coloured">
                        <a href={this.state.Website}>{this.state.Website}</a>
                      </span>
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <p>
                        <strong>Sector:</strong> {this.state.Sector}
                      </p>
                      <p>
                        <strong>Industry:</strong> {this.state.Industry}
                      </p>
                      <p>
                        <strong>Full-time employees:</strong> {this.state.NumberOfEmployees}
                      </p>
                      <p>
                        <strong>Stock Symbol:</strong> {this.state.Symbol}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <p>
                        <strong>Description:</strong> {this.state.Summary}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              <br />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CompanyInfo;

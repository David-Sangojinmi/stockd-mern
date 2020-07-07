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
      Value: "",

      // Key Data (Valuation)
      MktCp: [],
      EntVl1: [],
      EntVl2: [],
      TtlShrOts: [],
      NumEpl: [],
      NmShlrds: [],
      PytRat: [],
      PrcToErnRat2: [],
      PrcToBk: [],
      PrcToSl: [],
      // Key Data (Balance Sheet)
      QkRt: [],
      CrRt: [],
      DtEqRt: [],
      NtDt: [],
      TlDt: [],
      TlAts: [],
      // Key Data (Operating Metrics)
      RtOnAst: [],
      RtOnEq: [],
      RtOnIC: [],
      RvPEm: [],
      // Key Data (Price History)
      AvgVl: [],
      OnYrBt: [],
      FTWkHh: [],
      FTWkLw: [],
      // Key Data (Dividends)
      DvdPd: [],
      DvdYd: [],
      DvdShr: [],
      // Key Data (Margins)
      NtMgn: [],
      GrsMgn: [],
      OprMgn: [],
      PtxMgn: [],
      // Key Data (Income Statement)
      BscE1: [],
      BscE2: [],
      EDlt: [],
      NtIc: [],
      EBTA: [],
      GrPf1: [],
      GrPf2: [],
      LsYrRv: [],
      TlRv: [],
      FrChFl: []
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

    // Key Data (Valuation) Function
    let MktCpF = [];
    let EntVl1F = [];
    let EntVl2F = [];
    let TtlShrOtsF = [];
    let NumEplF = [];
    let NmShlrdsF = [];
    let PytRatF = [];
    let PrcToErnRat2F = [];
    let PrcToBkF = [];
    let PrcToSlF = [];
    // Key Data (Balance Sheet) Function
    let QkRtF = [];
    let CrRtF = [];
    let DtEqRtF = [];
    let NtDtF = [];
    let TlDtF = [];
    let TlAtsF = [];
    // Key Data (Operating Metrics) Function
    let RtOnAstF = [];
    let RtOnEqF = [];
    let RtOnICF = [];
    let RvPEmF = [];
    // Key Data (Price History) Function
    let AvgVlF = [];
    let OnYrBtF = [];
    let FTWkHhF = [];
    let FTWkLwF = [];
    // Key Data (Dividends) Function
    let DvdPdF = [];
    let DvdYdF = [];
    let DvdShrF = [];
    // Key Data (Margins) Function
    let NtMgnF = [];
    let GrsMgnF = [];
    let OprMgnF = [];
    let PtxMgnF = [];
    // Key Data (Income Statement) Function
    let BscE1F = [];
    let BscE2F = [];
    let EDltF = [];
    let NtIcF = [];
    let EBTAF = [];
    let GrPf1F = [];
    let GrPf2F = [];
    let LsYrRvF = [];
    let TlRvF = [];
    let FrChFlF = [];

    axios
      .all([
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
        }),
        axios({
          method: "GET",
          url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary",
          headers: {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key": RAPID_API_KEY,
            useQueryString: true
          },
          params: {
            symbol: Symbol
          }
        }),
        axios({
          method: "GET",
          url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-financials",
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
      ])
      .then(
        axios.spread((...response) => {
          console.log(response[0].data, response[1].data, response[2].data);

          FullnameFunction.push(response[0].data["price"]["longName"]);
          CurrencyFunction.push(response[0].data["price"]["currencySymbol"]);
          CountryFunction.push(response[0].data["assetProfile"]["country"]);
          SectorFunction.push(response[0].data["assetProfile"]["sector"]);
          IndustryFunction.push(response[0].data["assetProfile"]["industry"]);
          SymbolFunction.push(response[0].data["symbol"]);
          SummaryFunction.push(response[0].data["assetProfile"]["longBusinessSummary"]);
          StockPriceFunction.push(response[0].data["price"]["regularMarketPrice"]["raw"]);
          HeadquartersFunction.push(response[0].data["assetProfile"]["address1"]);
          HeadquartersFunction.push(response[0].data["assetProfile"]["address2"]);
          HeadquartersFunction.push(response[0].data["assetProfile"]["city"]);
          HeadquartersFunction.push(response[0].data["assetProfile"]["zip"]);

          NumberOfEmployeesFunction.push(response[0].data["assetProfile"]["fullTimeEmployees"]);
          WebsiteFunction.push(response[0].data["assetProfile"]["website"]);

          // Key Data pushes
          MktCpF.push(response[0].data["price"]["marketCap"]["fmt"]);
          EntVl1F.push(response[1].data["defaultKeyStatistics"]["enterpriseValue"]["fmt"]);
          EntVl2F.push(response[1].data["defaultKeyStatistics"]["enterpriseToEbitda"]["fmt"]);
          TtlShrOtsF.push(response[1].data["defaultKeyStatistics"]["sharesOutstanding"]["fmt"]);
          NumEplF.push(response[0].data["assetProfile"]["fullTimeEmployees"]);
          NmShlrdsF.push(response[0].data["price"]["longName"]);
          PytRatF.push(response[0].data["summaryDetail"]["payoutRatio"]["fmt"]);
          PrcToErnRat2F.push(response[0].data["price"]["longName"]);
          PrcToBkF.push(response[1].data["defaultKeyStatistics"]["priceToBook"]["fmt"]);
          PrcToSlF.push(response[0].data["summaryDetail"]["priceToSalesTrailing12Months"]["fmt"]);
          QkRtF.push(response[1].data["financialData"]["quickRatio"]["fmt"]);
          CrRtF.push(response[1].data["financialData"]["currentRatio"]["fmt"]);
          DtEqRtF.push(response[1].data["financialData"]["debtToEquity"]["fmt"]);
          NtDtF.push(response[2].data["balanceSheetHistoryQuarterly"][["balanceSheetStatements"][0]]["longTermDebt"]); //fmt
          TlDtF.push(response[1].data["financialData"]["totalDebt"]["fmt"]);
          TlAtsF.push(response[2].data["balanceSheetHistoryQuarterly"][["balanceSheetStatements"][0]]["totalAssets"]); // fmt
          RtOnAstF.push(response[1].data["financialData"]["returnOnAssets"]["fmt"]);
          RtOnEqF.push(response[1].data["financialData"]["returnOnEquity"]["fmt"]);
          RtOnICF.push(response[0].data["price"]["longName"]);
          RvPEmF.push(response[0].data["price"]["longName"]);
          AvgVlF.push(response[0].data["price"]["averageDailyVolume10Day"]["fmt"]);
          OnYrBtF.push(response[0].data["summaryDetail"]["beta"]["fmt"]);
          FTWkHhF.push(response[0].data["summaryDetail"]["fiftyTwoWeekHigh"]["fmt"]);
          FTWkLwF.push(response[0].data["summaryDetail"]["fiftyTwoWeekLow"]["fmt"]);
          DvdPdF.push(response[0].data["price"]["longName"]);
          DvdYdF.push(response[1].data["summaryDetail"]["dividendYield"]["fmt"]);
          DvdShrF.push(response[1].data["summaryDetail"]["dividendRate"]["fmt"]);
          NtMgnF.push(response[0].data["price"]["longName"]);
          GrsMgnF.push(response[1].data["financialData"]["grossMargins"]["fmt"]);
          OprMgnF.push(response[1].data["financialData"]["operatingMargins"]["fmt"]);
          PtxMgnF.push(response[1].data["financialData"]["profitMargins"]["fmt"]);
          BscE1F.push(response[0].data["price"]["longName"]);
          // BscE2F.push(response[2].data["timeSeries"][["annualBasicEPS"][3]]["reportedValue"]["raw"]); //reportedValue is problem
          // EDltF.push(response[2].data["timeSeries"][["annualDilutedEPS"][3]]["reportedValue"]["fmt"]);
          // NtIcF.push(
          //  response[2].data["timeSeries"][["trailingNetIncome"][0]]["reportedValue"]["fmt"]
          // );
          EBTAF.push(response[1].data["financialData"]["ebitda"]["fmt"]);
          GrPf1F.push(response[0].data["price"]["longName"]);
          GrPf2F.push(response[1].data["financialData"]["grossProfits"]["fmt"]);
          // LsYrRvF.push(
          //   response[2].data["timeSeries"]["annualTotalRevenue"]["3"]["reportedValue"]["fmt"]
          // );
          TlRvF.push(response[1].data["financialData"]["totalRevenue"]["fmt"]);
          FrChFlF.push(response[1].data["financialData"]["freeCashflow"]["fmt"]);
          // ---------------

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
            Website: WebsiteFunction,

            MktCp: MktCpF,
            EntVl1: EntVl1F,
            EntVl2: EntVl2F,
            TtlShrOts: TtlShrOtsF,
            NumEpl: NumEplF,
            NmShlrds: NmShlrdsF,
            PytRat: PytRatF,
            PrcToErnRat2: PrcToErnRat2F,
            PrcToBk: PrcToBkF,
            PrcToSl: PrcToSlF,
            QkRt: QkRtF,
            CrRt: CrRtF,
            DtEqRt: DtEqRtF,
            NtDt: NtDtF, //
            TlDt: TlDtF,
            TlAts: TlAtsF, //
            RtOnAst: RtOnAstF,
            RtOnEq: RtOnEqF,
            RtOnIC: RtOnICF,
            RvPEm: RvPEmF,
            AvgVl: AvgVlF,
            OnYrBt: OnYrBtF,
            FTWkHh: FTWkHhF,
            FTWkLw: FTWkLwF,
            DvdPd: DvdPdF,
            DvdYd: DvdYdF,
            DvdShr: DvdShrF,
            NtMgn: NtMgnF,
            GrsMgn: GrsMgnF,
            OprMgn: OprMgnF,
            PtxMgn: PtxMgnF,
            BscE1: BscE1F,
            BscE2: BscE2F,
            EDlt: EDltF,
            NtIc: NtIcF,
            EBTA: EBTAF,
            GrPf1: GrPf1F,
            GrPf2L: GrPf2F,
            LsYrRv: LsYrRvF,
            TlRv: TlRvF,
            FrChFl: FrChFlF
          });
        })
      )
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
                  <SearchBar value={Value} onChange={this.handleChange} onClick={this.handleClick} />
                </div>
              </div>
              <section className="dashboard-section">
                <div className="container">
                  <h2>{this.state.Fullname}</h2>
                  {/* <p>
                    Stock Price: {this.state.Currency} {this.state.StockPrice}
                  </p> */}
                  <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                      <p>
                        <strong>Address:</strong> {this.state.Headquarters[0]}
                        {", "}
                        {this.state.Headquarters[1]}
                        {", "}
                        {this.state.Headquarters[2]} {this.state.Headquarters[3]}
                      </p>
                      <p>
                        <strong>Country:</strong> {this.state.Country}
                      </p>
                      <strong>Website:</strong>{" "}
                      <span id="coloured">
                        <a href={this.state.Website}>{this.state.Website}</a>
                      </span>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
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
                  <div className="row">
                    <div className="col-md-12">
                      <h3>Key Data</h3>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                      <h5>Valuation</h5>
                      <p>Market Capitalisation <strong>{this.state.MktCp}</strong><br />Enterprise Value (MRQ) <strong>{this.state.EntVl1}</strong><br />Enterprise Value/EBITDA (TTM) <strong>{this.state.EntVl2}</strong><br />Total Shares Outstanding (MRQ) <strong>{this.state.TtlShrOts}</strong><br />Number of Employees <strong>{this.state.NumEpl}</strong><br />Number of Shareholders <strong>{this.state.NmShlrds}</strong><br />Payout Ratio (TTM) <strong>{this.state.PytRat}</strong><br />Price to Revenue Ratio (TTM) <strong>{this.state.PrcToErnRat2}</strong><br />Price to Book (FY) <strong>{this.state.PrcToBk}</strong><br />Price to Sales (FY) <strong>{this.state.PrcToSl}</strong></p>
                      <h5>Balance Sheet</h5>
                      <p>Quick Ratio (MRQ) <strong>{this.state.QkRt}</strong><br />Current Ratio (MRQ) <strong>{this.state.CrRt}</strong><br />Debt to Equity Ratio (MRQ) <strong>{this.state.DtEqRt}</strong><br />Net Debt (MRQ) <strong>{this.state.NtDt}</strong><br />Total Debt (MRQ) <strong>{this.state.TlDt}</strong><br />Total Assets (MRQ) <strong>{this.state.TlAts}</strong></p>
                      <h5>Operating Metrics</h5>
                      <p>Return on Assets (TTM) <strong>{this.state.RtOnAst}</strong><br />Return on Equity (TTM) <strong>{this.state.RtOnEq}</strong><br />Return on Invested Capital (TTM) <strong>{this.state.RtOnIC}</strong><br />Revenue per Employee (TTM) <strong>{this.state.RvPEm}</strong></p>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                      <h5>Price History</h5>
                      <p>Average Volume (10 day) <strong>{this.state.AvgVl}</strong><br />1-Year Beta <strong>{this.state.OnYrBt}</strong><br />52 Week High <strong>{this.state.FTWkHh}</strong><br />52 Week Low <strong>{this.state.FTWkLw}</strong></p>
                      <h5>Dividends</h5>
                      <p>Dividends Paid (FY) <strong>{this.state.DvdPd}</strong><br />Dividends Yield (FY) <strong>{this.state.DvdYd}</strong><br />Dividends per Share (FY) <strong>{this.state.DvdShr}</strong></p>
                      <h5>Margins</h5>
                      <p>Net Margin (TTM) <strong>{this.state.NtMgn}</strong><br />Gross Margin (TTM) <strong>{this.state.GrsMgn}</strong><br />Operating Margin (TTM) <strong>{this.state.OprMgn}</strong><br />Pretax Margin (TTM) <strong>{this.state.PtxMgn}</strong></p>
                      <h5>Income Statement</h5>
                      <p>Basic EPS (FY) <strong>{this.state.BscE1}</strong><br />Basic EPS (TTM) <strong>{this.state.BscE2}</strong><br />EPS Diluted (FY) <strong>{this.state.EDlt}</strong><br />Net Income (FY) <strong>{this.state.NtIc}</strong><br />EBITDA (TTM) <strong>{this.state.EBTA}</strong><br />Gross Profit (MRQ) <strong>{this.state.GrPf1}</strong><br />Gross Profit (FY) <strong>{this.state.GrPf2}</strong><br />Last Year Revenue (FY) <strong>{this.state.LsYrRv}</strong><br />Total Revenue (FY) <strong>{this.state.TlRv}</strong><br />Free Cash Flow (TTM) <strong>{this.state.FrChFl}</strong></p>
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

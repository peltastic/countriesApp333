import React, { Component } from "react";
import classes from "./CountriesInfo.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

class CountriesInfo extends Component {
  state = {
    loadedResponse: null,
    permanentData: null,
    data: null,
  };

  componentDidMount() {
    if (this.props.match.params.name) {
      axios
        .all([
          axios.get(
            "https://restcountries.eu/rest/v2/name/" +
              this.props.match.params.name
          ),
          axios.get("https://restcountries.eu/rest/v2/all"),
        ])
        .then(
          axios.spread((response1, response2) => {
            this.setState({ data: response1.data });
            this.setState({ permanentData: response2.data });
            this.setState({ loadedResponse: this.state.data })
          })
        );

    }
  }
  countryLinks = (id) => {
    const dataCopy = [...this.state.permanentData];
    const check = dataCopy.filter((el) => {
      return id === el.alpha3Code;
    });
    this.setState({ loadedResponse: check });
    
  };
  render() {
    let info = <p>loading..</p>;

    if (this.state.loadedResponse) {
      const currencies = this.state.loadedResponse[0].currencies.map((el) => {
        return <p key={el.name}><b>Currencies: </b>{el.name}</p>;
      });
      const topLevelDomains = this.state.loadedResponse[0].topLevelDomain.map(
        (el) => {
          return <p key={el}><b>Top level Domain: </b>{el}</p>;
        }
      );
      const languages = this.state.loadedResponse[0].languages.map((el) => {
        return el.name + " ";
      });
      const borders = this.state.loadedResponse[0].borders.map((el) => {
        return (
            <button key={el} onClick={() => this.countryLinks(el)}>{el}</button>
        );
      });
      info = (
        <React.Fragment>
          <div className={classes.Body}>
            <Link to="/" exact="true">
              <button className={classes.Link}>&larr; Back</button>
            </Link>
            <div className={classes.Content}>
              <img src={this.state.loadedResponse[0].flag} alt="flag" />
              <div className={classes.Right}>
                <div className={classes.Left}>
                  <h1>{this.state.loadedResponse[0].name}</h1>
                  <p><b>Native Name: </b> {this.state.loadedResponse[0].nativeName}</p>
                  <p><b>Population: </b> {this.state.loadedResponse[0].population}</p>
                  <p><b>Region: </b> {this.state.loadedResponse[0].region}</p>
                  <p><b>Sub region:</b> {this.state.loadedResponse[0].subregion}</p>
                </div>
                <div className={classes.Right}>
                  {topLevelDomains}
                  {currencies}
                  <p><b>Languages: </b> {languages}</p>
                </div>
                <div className={classes.Bottom}>
                  <p><b>Border Countries: </b></p>
                  {borders}
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
    return info;
  }
}

export default CountriesInfo;

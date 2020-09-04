import React, { Component } from "react";

import Layout from "./components/Layout/Layout";
import Header from "./components/Header/Header";
import Countries from "./components/Countries/Countries";
import axios from "axios";
import { Route, Link } from "react-router-dom";
import CountriesInfo from "./containers/CountriesInfo/CountriesInfo";

class App extends Component {
  state = {
    data: null,
    permanentData: null,
  };

  componentDidMount() {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      const responseData = response.data;
      this.setState({ permanentData: responseData });
      if (this.state.permanentData) {
        this.setState({ data: this.state.permanentData });
      }
    });
  }
  searchHandler = (event) => {
    let search = event.target.value;
    let dataCopy = [...this.state.permanentData];
    let searchResult = dataCopy.filter((el) => {
      return el.name.toLowerCase() === search.toLowerCase();
    });
    dataCopy = searchResult;
    this.setState({ data: dataCopy });

    if (!search) {
      this.setState({ data: this.state.permanentData });
    }
  };

  continentSearchHandler = (event) => {
    if (event.target.value === "Filter By Region") {
      this.setState({ data: this.state.permanentData });
    } else {
      const search = event.target.value;
      let dataCopy = [...this.state.permanentData];
      let searchResult = dataCopy.filter((el) => {
        return el.region.toLowerCase() === search.toLowerCase();
      });
      dataCopy = searchResult;
      this.setState({ data: dataCopy });
    }
  };
  render() {
    let cards;
    if (this.state.data) {
      cards = this.state.data.map((el) => {
        return (
          <Link to={"/" + el.name} key={el.name}>
            <Countries
              image={el.flag}
              country={el.name}
              population={el.population}
              region={el.region}
              capital={el.capital}
              
            />
          </Link>
        );
      });
    }

    return (
      <React.Fragment>
        <Header />
        <Route
          path="/"
          exact
          render={() => (
            <Layout
              change={this.searchHandler}
              clicked={this.continentSearchHandler}
            >
              {cards}
            </Layout>
          )}
        />
        <Route path="/:name" exact component={CountriesInfo} />
      </React.Fragment>
    );
  }
}

export default App;

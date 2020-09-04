import React from "react";

import classes from "./Countries.module.css";

const countries = (props) => {
  return (
      <div className={classes.Cards}>
        <img src={props.image} alt="pic" />
        <h2>{props.country}</h2>
        <p><b>Population: </b> {props.population}</p>
        <p><b>Region: </b> {props.region}</p>
        <p><b>Capital: </b> {props.capital}</p>
      </div>
    
  );
};

export default countries;

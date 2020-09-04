import React from "react";

import classes from "./Filters.module.css";
import searchIcon from "../../assets/icons8-search.svg";

const filter = (props) => {
  return (
    <div className={classes.Filters}>
      <label>
        <img src={searchIcon} alt="icon" />
      </label>
      <input
        type="text"
        className={classes.Search}
        onChange={(event) => props.change(event)}
        placeholder="Search for a country..."
      ></input>

      <select
        className={classes.Dropdown}
        onChange={(event) => {
          props.clicked(event);
        }}
      >
        <option value="Filter By Region">Filter By Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
};

export default filter;

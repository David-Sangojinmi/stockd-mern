import React, { Component } from "react";

const SearchBar = (props) => {
  return (
    <>
      <form>
        <input placeholder={"Stock symbol"} value={props.value} onChange={props.onChange} />
        <button className="m-btn-db m-btn-theme" onClick={props.onClick}>
          Search
        </button>
      </form>
    </>
  );
};

export default SearchBar;

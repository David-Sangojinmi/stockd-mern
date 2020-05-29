import React, { Component } from "react";

const SearchBar = (props) => {
  return (
    <>
      <form>
        <input className="" value={props.value} onChange={props.onChange} />
        <button className="m-btn m-btn-theme" onClick={props.onClick}>
          Search
        </button>
      </form>
    </>
  );
};

export default SearchBar;

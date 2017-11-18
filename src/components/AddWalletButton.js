import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


class AddWalletButton extends Component {


  render() {
    return (
      <div className="addTransactionButton">
        <Link to={"/coin/new"} type="button" className="text-center plus-sign">
          +
        </Link>
      </div>
    );
  }
}

export default AddWalletButton;

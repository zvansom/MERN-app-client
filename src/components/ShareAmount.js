import React, { Component } from "react";
import InputField from "./InputField";

export default class ShareAmount extends Component {
  render() {
    return (
      <input
        className="shares"
        type="number"
        onChange={this.props.handleshares}
        placeholder={"#"}
        min="0"
        max={this.props.max}
        value={this.props.shares}
        step="1"
      />
    );
  }
}

import React, { Component } from "react";
import InputField from "./InputField";

export default class ShareAmount extends Component {
  render() {
    return (
      <div>
        <InputField
          name={"shares"}
          type={"number"}
          placeholder={"0"}
          onChange={this.handleClear}
          min={"0"}
          max={this.props.max}
          step={"1"}
          onChange={this.props.handleshares}
        />
      </div>
    );
  }
}

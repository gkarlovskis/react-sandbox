import * as React from "react";
import { IInputDefaultProps } from "../../interfaces/props/i-input-default-props";
import { IInputDefaultState } from "../../interfaces/states/i-input-default-state";

export default class TextInput extends React.Component<IInputDefaultProps, IInputDefaultState> {
  constructor(props: IInputDefaultProps) {
    super(props);

    this.state = {
      value: this.props.value,
      isValid: true,
      errorMessage: "",
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.getState = this.getState.bind(this);
  }

  public getState(): IInputDefaultState {
    const result = { ...this.state };
    result["errorMessage"] = "";
    result["isValid"] = true;
    this.setState(result);
    const validationResult = this.validateInput(this.state.value);
    if (validationResult !== "") {
      result["errorMessage"] = validationResult;
      result["isValid"] = false;
      this.setState(result);
    }

    return result;
  }

  private onInputChange(e: any): void {
    const inputValue: string = e.target.value;
    this.setState({ value: inputValue });

    if (this.props.onChange) {
      this.props.onChange(inputValue);
    }
  }

  // private validateInput(val: string | undefined): string {
  //   if (!val && this.props.required) {
  //     return "This is required field";
  //   }

  //   return "";
  // }

  validateInput = (val: string | undefined): string => {
    if (!val && this.props.required) {
      return "This is required field";
    }

    return "";
  };

  render() {
    return (
      <div>
        <input
          type="email"
          value={this.state.value}
          className="form-control"
          placeholder={this.props.placeholder ? this.props.placeholder : "Enter text"}
          minLength={this.props.minlength}
          maxLength={this.props.maxlength}
          autoComplete="off"
          style={!this.state.isValid ? { border: "1px solid red" } : {}}
          onChange={this.onInputChange}
        />
        <small className="text-danger" style={!this.state.isValid ? { display: "block" } : { display: "none" }}>
          {this.state.errorMessage}
        </small>
      </div>
    );
  }
}

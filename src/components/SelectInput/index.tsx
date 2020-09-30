import * as React from "react";
import { PersonTitleEnumUtils } from "../../interfaces/enums/person_title";
import { ISelectDefaultProps } from "../../interfaces/props/i-select-default-props";
import { ISelectDefaultState } from "../../interfaces/states/i-select-default-state";

export default class SelectInput extends React.Component<
  ISelectDefaultProps,
  ISelectDefaultState
> {
  constructor(props: ISelectDefaultProps) {
    super(props);

    this.state = {
      value: this.props.value,
      keys: [],
      options: [],
      isValid: true,
      errorMessage: "errorMessage",
    };

    this.onValueChange = this.onValueChange.bind(this);
    this.getState = this.getState.bind(this);
  }

  public getState(): ISelectDefaultState {
    let result = { ...this.state };
    result["errorMessage"] = "";
    result["isValid"] = true;
    this.setState(result);
    const validationResult = this.validate(this.state.value);
    if (validationResult !== "") {
      result["errorMessage"] = validationResult;
      result["isValid"] = false;
      this.setState(result);
    }

    return result;
  }

  private onValueChange(e: any): void {
    const inputValue: string = e.target.value;
    this.setState({ value: inputValue });

    if (this.props.onChange) {
      this.props.onChange(inputValue);
    }
  }

  private validate(val: string | undefined): string {
    console.log("Validate = " + val);
    if (!val || (val === "DEFAULT" && this.props.required)) {
      return "This is required field";
    }

    return "";
  }

  componentDidMount() {
    //Load data
    this.setState({
      keys: PersonTitleEnumUtils.getKeys(),
      options: PersonTitleEnumUtils.getValues(),
    });
  }

  render() {
    return (
      <div>
        <select
          className="form-control"
          id={this.props.name}
          onChange={this.onValueChange}
          value={this.state.value}
        >
          <option key={-1} value={""}></option>
          {this.state.options?.map((val, idx) => (
            <option key={this.state.keys[idx]} value={this.state.keys[idx]}>
              {val.charAt(0).toUpperCase() + val.slice(1).toLocaleLowerCase()}
            </option>
          ))}
        </select>

        <small
          className="text-danger"
          style={
            !this.state.isValid ? { display: "block" } : { display: "none" }
          }
        >
          {this.state.errorMessage}
        </small>
      </div>
    );
  }
}

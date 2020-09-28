import * as React from 'react';
import { InputDefaultProps } from '../../interfaces/i-input-default-props';
import { InputDefaultState } from '../../interfaces/i-input-default-state';

export default class EmailInput extends React.Component<
  InputDefaultProps,
  InputDefaultState
> {
  constructor(props: InputDefaultProps) {
    super(props);

    this.state = {
      value: this.props.value,
      isValid: true,
      errorMessage: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.getState = this.getState.bind(this);
  }

  public getState(): InputDefaultState {
    let result = { ...this.state };
    result['errorMessage'] = '';
    result['isValid'] = true;
    this.setState(result);
    const validationResult = this.validateInput(this.state.value);
    if (validationResult !== '') {
      result['errorMessage'] = validationResult;
      result['isValid'] = false;
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

  private validateInput(val: string | undefined): string {
    //eslint-disable-next-line
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

    if (!val) {
      return 'Please enter email';
    }
    if (!emailRegex.test(val)) return 'Incorrect email';
    return '';
  }

  render() {
    return (
      <div>
        <input
          type="email"
          value={this.state.value}
          className="form-control"
          placeholder="Enter email"
          autoComplete="off"
          style={!this.state.isValid ? { border: '1px solid red' } : {}}
          onChange={this.onInputChange}
        />
        <small
          className="text-danger"
          style={
            !this.state.isValid ? { display: 'block' } : { display: 'none' }
          }
        >
          {this.state.errorMessage}
        </small>
      </div>
    );
  }
}

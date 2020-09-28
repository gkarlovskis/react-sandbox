import * as React from 'react';
import { IInputDefaultProps } from '../../interfaces/i-input-default-props';
import { IInputDefaultState } from '../../interfaces/i-input-default-state';

export default class PasswordInput extends React.Component<
  IInputDefaultProps,
  IInputDefaultState
> {
  constructor(props: IInputDefaultProps) {
    super(props);

    this.state = {
      value: this.props.value,
      isValid: true,
      errorMessage: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.getState = this.getState.bind(this);
  }

  public getState(): IInputDefaultState {
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
    const pswRegex = /(?=.{8,})/;

    if (!val) {
      return 'Please enter a password';
    }
    if (!pswRegex.test(val))
      return 'Password must be eight characters or longer';

    return '';
  }

  render() {
    return (
      <div>
        <input
          type="password"
          value={this.state.value}
          className="form-control"
          autoComplete="current-password"
          placeholder="Enter password"
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

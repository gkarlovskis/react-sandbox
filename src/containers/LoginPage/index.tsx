import React, { Component } from 'react';
import EmailInput from '../../components/EmailInput';
import PasswordInput from '../../components/PasswordInput';
import { IFormProps } from '../../interfaces/i-form-props';
import { InputDefaultState } from '../../interfaces/i-input-default-state';
import { ILoginFormFormState } from '../../interfaces/i-login-form-state';
import { login } from '../../services/authentication-service';

export default class LoginPage extends Component<
  IFormProps,
  ILoginFormFormState
> {
  private passwordInput: React.RefObject<PasswordInput>;
  private emailInput: React.RefObject<EmailInput>;

  constructor(props: IFormProps) {
    super(props);
    this.passwordInput = React.createRef();
    this.emailInput = React.createRef();

    this.state = {
      errorMessage: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
  }

  private errorHandler(error: Error): void {
    this.setState(() => ({ errorMessage: error.message }));
  }

  private handlePasswordChange(): void {
    console.log('Handle password change for demo purposes');
  }

  /**
   * Submits the form to the http api
   * @returns {boolean} - Whether the form submission was successful or not
   */
  private async handleSubmit(e: any): Promise<boolean> {
    e.preventDefault();

    //Validate input fields
    this.setState({ errorMessage: '' });
    const emailFieldState:
      | InputDefaultState
      | undefined = this.emailInput.current?.getState();

    const passwordFieldState:
      | InputDefaultState
      | undefined = this.passwordInput.current?.getState();

    if (!emailFieldState?.isValid || !passwordFieldState?.isValid) {
      return false;
    }

    //Check user access rights
    await login(
      emailFieldState.value ? emailFieldState.value : '',
      passwordFieldState.value ? passwordFieldState.value : '',
    )
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        this.errorHandler(error);
        return false;
      });

    return true;
  }

  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={this.handleSubmit} noValidate={true}>
            <h3>Sign In</h3>

            <div className="form-group">
              <label>Email address</label>
              <EmailInput value="demo@demo.lv" ref={this.emailInput} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <PasswordInput
                value=""
                ref={this.passwordInput}
                onChange={this.handlePasswordChange}
              />
            </div>
            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
            <div className="text-danger text-center" style={{ margin: '10px' }}>
              {this.state.errorMessage}
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
            <p className="forgot-password text-right">
              Forgot <a href="http://localhost:3000">password?</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

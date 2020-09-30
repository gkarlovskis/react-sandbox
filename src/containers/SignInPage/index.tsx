import React, { Component } from "react";
import EmailInput from "../../components/EmailInput";
import PasswordInput from "../../components/PasswordInput";
import { IInputDefaultState } from "../../interfaces/states/i-input-default-state";
import { ISignInFormFormState } from "../../interfaces/states/i-signin-form-state";
import { login } from "../../services/authentication-service";
import { ISignInPage } from "../../interfaces/i-signin-page";
import { connect } from "react-redux";
import { TAppState } from "../../interfaces/types/t-app-state";
import { ISignInPageProps } from "../../interfaces/props/i-signin-page-props";

class SignInPage
  extends Component<ISignInPageProps, ISignInFormFormState>
  implements ISignInPage {
  private passwordInput: React.RefObject<PasswordInput>;
  private emailInput: React.RefObject<EmailInput>;

  constructor(props: ISignInPageProps) {
    super(props);
    this.passwordInput = React.createRef();
    this.emailInput = React.createRef();

    this.state = {
      errorMessage: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
  }

  errorHandler(error: Error): void {
    this.setState(() => ({ errorMessage: error.message }));
  }

  handlePasswordChange(): void {
    console.log("Handle password change for demo purposes");
  }

  /**
   * Submits the form to the http api
   * @returns {boolean} - Whether the form submission was successful or not
   */
  async handleSubmit(e: any): Promise<boolean> {
    e.preventDefault();

    //Validate input fields
    this.setState({ errorMessage: "" });
    const emailFieldState:
      | IInputDefaultState
      | undefined = this.emailInput.current?.getState();

    const passwordFieldState:
      | IInputDefaultState
      | undefined = this.passwordInput.current?.getState();

    if (!emailFieldState?.isValid || !passwordFieldState?.isValid) {
      return false;
    }

    //Check user access rights
    await login(
      emailFieldState.value ? emailFieldState.value : "",
      passwordFieldState.value ? passwordFieldState.value : ""
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
              <EmailInput value="" ref={this.emailInput} />
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
            <div className="text-danger text-center" style={{ margin: "10px" }}>
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

const mapStateToProps = function (state: TAppState) {
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps)(SignInPage);

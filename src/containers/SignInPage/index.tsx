/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
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
import { Link } from "react-router-dom";
import ForgotPasswordModalForm from "../ForgotPasswordModalForm";

class SignInPage extends Component<ISignInPageProps, ISignInFormFormState> implements ISignInPage {
  private passwordInput: React.RefObject<PasswordInput>;
  private emailInput: React.RefObject<EmailInput>;

  constructor(props: ISignInPageProps) {
    super(props);
    this.passwordInput = React.createRef();
    this.emailInput = React.createRef();

    this.state = {
      errorMessage: "",
      isSubmitted: false,
      showForgotPasswordModal: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onForgotPasswordClicked = this.onForgotPasswordClicked.bind(this);
    this.reloadWin = this.reloadWin.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  onForgotPasswordClicked(e: any): void {
    e.preventDefault();
    this.setState({ showForgotPasswordModal: true });
  }

  handlePasswordChange(): string {
    console.log("Handle password change for demo purposes");
    return "handlePasswordChange";
  }

  closeModal = () => {
    this.setState({ showForgotPasswordModal: false });
  };

  onForgotPasswordSubmit = (e: any) => {
    e.preventDefault();
    this.setState({ showForgotPasswordModal: false });
  };

  private reloadWin(): void {
    window.location.reload();
  }

  /**
   * Submits the form to the http api
   * @returns {boolean} - Whether the form submission was successful or not
   */
  async handleSubmit(e: any): Promise<boolean> {
    e.preventDefault();
    //Validate input fields
    this.setState({ errorMessage: "", isSubmitted: false });
    const emailFieldState: IInputDefaultState | undefined = this.emailInput.current?.getState();
    const passwordFieldState: IInputDefaultState | undefined = this.passwordInput.current?.getState();

    if (!emailFieldState?.isValid || !passwordFieldState?.isValid) {
      return false;
    }

    //Check user access rights
    await login(emailFieldState.value ? emailFieldState.value : "", passwordFieldState.value ? passwordFieldState.value : "")
      .then((res) => {
        if (res) {
          this.setState({ isSubmitted: true });
          this.reloadWin();
        } else {
          this.setState({ isSubmitted: false });
        }
        return false;
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message, isSubmitted: false });
        return false;
      });

    this.setState({ isSubmitted: true });
    return true;
  }

  render() {
    return (
      <React.Fragment>
        <div className="container text-center">
          <div className="row ">
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
                    <PasswordInput value="" ref={this.passwordInput} onChange={this.handlePasswordChange} />
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="customCheck1" />
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
                    Forgot{" "}
                    <Link to="" id="forgot-password" onClick={this.onForgotPasswordClicked}>
                      password?
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
        {this.state.showForgotPasswordModal ? (
          <ForgotPasswordModalForm onSubmit={this.onForgotPasswordSubmit} closeModal={this.closeModal} />
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = function (state: TAppState) {
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps)(SignInPage);

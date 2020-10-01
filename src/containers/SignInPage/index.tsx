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

class SignInPage
  extends Component<ISignInPageProps, ISignInFormFormState>
  implements ISignInPage {
  private passwordInput: React.RefObject<PasswordInput>;
  private emailInput: React.RefObject<EmailInput>;
  private modal: React.RefObject<any>;
  private closeButton: React.RefObject<HTMLButtonElement>;

  constructor(props: ISignInPageProps) {
    super(props);
    this.passwordInput = React.createRef();
    this.emailInput = React.createRef();
    this.modal = React.createRef();
    this.closeButton = React.createRef();

    this.state = {
      errorMessage: "",
      showForgotPasswordModal: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
    this.onForgotPasswordClicked = this.onForgotPasswordClicked.bind(this);
  }

  onForgotPasswordClicked(e: any): void {
    e.preventDefault();
    console.log("OnForgotPasswordClicked");
    this.setState({ showForgotPasswordModal: true });
  }

  errorHandler(error: Error): void {
    this.setState(() => ({ errorMessage: error.message }));
  }

  handlePasswordChange(): void {
    console.log("Handle password change for demo purposes");
  }

  closeModal = () => {
    this.setState({ showForgotPasswordModal: false });
    this.toggleScrollLock();
  };

  onKeyDown = () => {
    console.log("onKeyDownClicked");
    // if (event.keyCode === 27) {
    //   this.closeModal();
    // }
  };

  onClickOutside = () => {
    console.log("onClickOutside");
    // if (this.modal && this.modal.contains(event.target)) return;
    // this.closeModal();
  };

  toggleScrollLock = () => {
    console.log("onClickOutside");
    //document.querySelector("html").classList.toggle("scroll-lock");
  };

  onForgotPasswordSubmit = () => {};

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
      <React.Fragment>
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
                  <label
                    className="custom-control-label"
                    htmlFor="customCheck1"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <div
                className="text-danger text-center"
                style={{ margin: "10px" }}
              >
                {this.state.errorMessage}
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
              <p className="forgot-password text-right">
                Forgot{" "}
                <Link to="" onClick={this.onForgotPasswordClicked}>
                  password?
                </Link>
              </p>
            </form>
          </div>
        </div>
        {this.state.showForgotPasswordModal ? (
          <ForgotPasswordModalForm
            onSubmit={this.onForgotPasswordSubmit}
            modalRef={(n: React.RefObject<any>) => (this.modal = n)}
            buttonRef={(n: React.RefObject<HTMLButtonElement>) =>
              (this.closeButton = n)
            }
            closeModal={this.closeModal}
            onKeyDown={this.onKeyDown}
            onClickOutside={this.onClickOutside}
          />
        ) : (
          "asdadasdasdsa"
        )}
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

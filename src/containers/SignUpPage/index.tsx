import React from "react";
import TextInput from "../../components/TextInput";
import { ISignUpPage } from "../../interfaces/i-signup-page";
import { ISignUpFormState } from "../../interfaces/states/i-signup-form-state";
import { IInputDefaultState } from "../../interfaces/states/i-input-default-state";
import PasswordInput from "../../components/PasswordInput";
import EmailInput from "../../components/EmailInput";
import SelectInput from "../../components/SelectInput";
import { PersonTitle } from "../../interfaces/enums/person_title";
import { ISelectDefaultState } from "../../interfaces/states/i-select-default-state";
import { ISignUpPageProps } from "../../interfaces/states/i-signup-page-props";

export default class SignUpPage
  extends React.Component<ISignUpPageProps, ISignUpFormState>
  implements ISignUpPage {
  private userNameInput: React.RefObject<TextInput> = React.createRef();
  private emailInput: React.RefObject<EmailInput> = React.createRef();
  private titleSelect: React.RefObject<SelectInput> = React.createRef();
  private passwordInput: React.RefObject<PasswordInput> = React.createRef();
  private password2Input: React.RefObject<PasswordInput> = React.createRef();

  constructor(props: ISignUpPageProps) {
    super(props);

    this.state = {
      errorMessage: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
  }

  errorHandler(error: Error): void {
    this.setState(() => ({ errorMessage: error.message }));
  }

  async handleSubmit(e: any): Promise<boolean> {
    e.preventDefault();

    //Validate input fields
    this.setState({ errorMessage: "" });
    const firstNameState:
      | IInputDefaultState
      | undefined = this.userNameInput.current?.getState();
    const titleSelectState:
      | ISelectDefaultState
      | undefined = this.titleSelect.current?.getState();
    const emailFieldState:
      | IInputDefaultState
      | undefined = this.emailInput.current?.getState();
    const passwordFieldState:
      | IInputDefaultState
      | undefined = this.passwordInput.current?.getState();
    const passwordField2State:
      | IInputDefaultState
      | undefined = this.password2Input.current?.getState();

    if (
      !firstNameState?.isValid ||
      !titleSelectState?.isValid ||
      !emailFieldState?.isValid ||
      !passwordFieldState?.isValid ||
      !passwordField2State?.isValid
    ) {
      return false;
    }

    if (passwordField2State.value !== passwordFieldState.value) {
      this.setState(() => ({
        errorMessage: "The password confirmation does not match",
      }));
      return false;
    }

    return true;
  }

  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={this.handleSubmit} noValidate={true}>
            <h3>Sign Up</h3>

            <div className="form-group">
              <label>Your name</label>
              <small className="text-danger">*</small>
              <TextInput
                value=""
                required={true}
                placeholder="Enter your name"
                ref={this.userNameInput}
              />
            </div>

            <div className="form-group">
              <label>Title</label>
              <small className="text-danger">*</small>
              <SelectInput
                required={true}
                value={PersonTitle.DR}
                ref={this.titleSelect}
              />
            </div>

            <div className="form-group">
              <label>Email address</label>
              <small className="text-danger">*</small>
              <EmailInput value="" ref={this.emailInput} />
            </div>

            <div className="form-group">
              <label>Password</label>
              <small className="text-danger">*</small>
              <PasswordInput value="" ref={this.passwordInput} />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <small className="text-danger">*</small>
              <PasswordInput value="" ref={this.password2Input} />
            </div>
            <div className="text-danger text-center" style={{ margin: "10px" }}>
              {this.state.errorMessage}
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Sign Up
            </button>
            <p className="forgot-password text-right">
              Already registered <a href="/sign-in">sign in?</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

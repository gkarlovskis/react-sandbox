export interface ISignInPage {
  handleSubmit(e: any): Promise<boolean>;
  onForgotPasswordClicked(e: any): void;
  closeModal: () => void;
  onForgotPasswordSubmit(e: any): void;
}

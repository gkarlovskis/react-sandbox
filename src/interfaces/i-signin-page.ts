export interface ISignInPage {
  handleSubmit(e: any): Promise<boolean>;
  handlePasswordChange(): void;
  errorHandler(error: Error): void;
  onForgotPasswordClicked(e: any): void;
  closeModal: () => void;
  onForgotPasswordSubmit: () => void;
}

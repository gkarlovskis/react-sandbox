export interface ISignInPage {
  handleSubmit(e: any): Promise<boolean>;
  handlePasswordChange(): void;
  errorHandler(error: Error): void;
}

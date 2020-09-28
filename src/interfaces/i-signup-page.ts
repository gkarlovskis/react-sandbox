export interface ISignUpPage {
  handleSubmit(e: any): Promise<boolean>;
  errorHandler(error: Error): void;
}

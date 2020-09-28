export interface IUser {
  username?: string;
  password_digest?: string;
  role?: string;
  authenticated: boolean;
}

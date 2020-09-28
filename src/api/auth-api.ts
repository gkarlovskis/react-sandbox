import { IUser } from "../interfaces/i-user";
import { IAuthResponse } from "./../interfaces/i-auth-response";
import { BaseApi } from "./base-api";

export class AuthApi extends BaseApi {
  private baseUrl: string;
  private apiUrlPostfix: string = "/post";

  constructor(baseUrl: string) {
    super();
    this.baseUrl = baseUrl;
  }

  public fetchUserData = async (
    username: string,
    password: string
  ): Promise<IUser> => {
    const response = await this.post<IUser, IAuthResponse>(
      "",
      this.baseUrl + this.apiUrlPostfix,
      { username: username, password_digest: password, authenticated: false },
      "Sends POST request to auth server and get user data"
    );

    // TODO: For testing purposes
    switch (response.data?.username) {
      case "demo@demo.lv":
        return {
          username: response.data?.username,
          role: "admin",
          authenticated: true,
        };
      case "demo1@demo.lv":
        return {
          username: response.data?.username,
          role: "user",
          authenticated: true,
        };
      default:
        return { username: undefined, role: undefined, authenticated: false };
    }
  };
}

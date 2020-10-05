import { AuthApi } from "./../api/auth-api";
import { IUser } from "./../interfaces/i-user";
import * as dotenvFlow from "dotenv-flow";
dotenvFlow.config({
  path: `${__dirname}/../../config`,
});

export const logout = async () => {
  localStorage.removeItem("currentUser");
  window.location.reload();
  return true;
};

export const login = async (username: string, password: string): Promise<boolean> => {
  const user: IUser = await new AuthApi(
    process.env.AUTH_API_ENDPOINT
      ? process.env.AUTH_API_ENDPOINT
      : "https://postman-echo.com"
  ).fetchUserData(username, password);
  if (!user.username) {
    localStorage.removeItem("currentUser");
    throw new Error("Incorrect password or username");
  }

  // store user details and jwt token in local storage to keep user logged in between page refreshes
  user.passwordDigest = "asdasds1321kljkjklj3123123213jklkx";
  localStorage.setItem("currentUser", JSON.stringify(user));

  return true;
};



export const getLoggedUser = async () => {
  const rawUser = localStorage.getItem("currentUser");
  if (!rawUser) return null;
  try {
    const currentUser: IUser = JSON.parse(rawUser);
    return currentUser ? currentUser : null;
  } catch (error) {
    return null;
  }

};

import { AuthApi } from "./../api/auth-api";
import { IUser } from "./../interfaces/i-user";
import * as dotenvFlow from "dotenv-flow";
dotenvFlow.config({
  path: `${__dirname}/../../config`,
});

const authApi = new AuthApi(
  process.env.AUTH_API_ENDPOINT
    ? process.env.AUTH_API_ENDPOINT
    : "https://postman-echo.com"
);

export const login = async (username: string, password: string) => {
  const user: IUser = await authApi.fetchUserData(username, password);

  if (!user.username) {
    logout();
    throw new Error("Incorrect password or username");
  }

  // store user details and jwt token in local storage to keep user logged in between page refreshes
  user.password_digest = "asdasds1321kljkjklj3123123213jklkx";
  localStorage.setItem("currentUser", JSON.stringify(user));

  return user;
};

export const logout = async () => {
  localStorage.removeItem("currentUser");
  window.location.reload();
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

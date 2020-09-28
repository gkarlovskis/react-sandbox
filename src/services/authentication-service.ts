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
  user.password_digest = "";
  user.authenticated = true;
  localStorage.setItem("currentUser", JSON.stringify(user));

  return user;
};

export const logout = async () => {
  localStorage.removeItem("currentUser");
  window.location.reload();
  return true;
};

export const isLoggedIn = async () => {
  const currentUser: IUser = JSON.parse(
    JSON.stringify(localStorage.getItem("currentUser"))
  );
  if (currentUser) {
    console.log(
      "Current user" +
      currentUser.username +
      " status=" +
      currentUser.authenticated
    );
  }
  return currentUser ? true : false;
};

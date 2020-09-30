import { IUser } from "../i-user";

export type TAppState = {
    isLoggedIn: boolean;
    user: IUser;
};
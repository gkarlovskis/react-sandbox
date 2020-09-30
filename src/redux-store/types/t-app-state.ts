import { IUser } from "../../interfaces/i-user";

export type TAppState = {
    isLoggedIn: boolean;
    user: IUser;
};
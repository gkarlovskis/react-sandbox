import { IUser } from "../i-user";

export interface IAppProps {
    isLoggedIn?: boolean;
    user?: IUser;
}

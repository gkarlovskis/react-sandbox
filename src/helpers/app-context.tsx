import React from "react";
import { IAppState } from "../interfaces/states/i-app-state";
export const AppContext = React.createContext<IAppState>({ isLoggedIn: false });

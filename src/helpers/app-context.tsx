import React from 'react';
import { IAppState } from '../App';

//export const appState: IAppState = { isLoggedIn: false };
//export const AppContext = React.createContext(appState);

export const AppContext = React.createContext<IAppState>({ isLoggedIn: false });

// export class MainPage extends React.Component<undefined, undefined> {
//   static contextType = UserContext;
//   context!: React.ContextType<typeof UserContext>;

//   public render() {
//     return <div>{this.context.isLoggedIn}</div>;
//   }
// }

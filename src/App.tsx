import React, { useEffect, useState } from "react";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import { Router, Switch } from "react-router-dom";
import history from "./helpers/browser-history";
import SignInPage from "./containers/SignInPage";
import SignUpPage from "./containers/SignUpPage";
import Header from "./components/Header";
import Dashboard from "./containers/Dashboard";
import { AppContext } from "./helpers/app-context";
import { getLoggedUser } from "./services/authentication-service";
import { AuthRoute, HomeRoute, NonAuthRoute } from "./helpers/router";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { IAppState } from "./interfaces/states/i-app-state";
import { IUser } from "./interfaces/i-user";
import { ReduxActionType } from "./interfaces/enums/redux-action-type";

const App: React.FC = () => {
  const [appState, setAppState] = useState<IAppState>({ isLoggedIn: false });

  const dispatch: Dispatch<any> = useDispatch();

  const updateAppState = (user: IUser | null) => {
    if (user === null || user === undefined) {
      dispatch({ type: ReduxActionType.LOG_OUT, data: { isLoggedIn: false } });
      setAppState({ isLoggedIn: false });
    } else {
      dispatch({
        type: user.username !== "" ? ReduxActionType.LOG_IN : ReduxActionType.LOG_OUT,
        data: { user: user },
      });
      setAppState({ isLoggedIn: user.username !== "" ? true : false });
    }
  };

  React.useEffect(() => {
    getLoggedUser().then((user) => {
      updateAppState(user);
    });
  });

  return (
    <AppContext.Provider value={appState}>
      <Router history={history}>
        <Header />
        <Switch>
          <NonAuthRoute isLogged={appState.isLoggedIn} path={"/sign-in"} component={SignInPage} />
          <NonAuthRoute isLogged={appState.isLoggedIn} path={"/sign-up"} component={SignUpPage} />
          <AuthRoute isAllowed={appState.isLoggedIn} exact path="/dashboard" component={Dashboard} />
          <HomeRoute isLogged={appState.isLoggedIn} path={"/"} component={Dashboard} />
        </Switch>
      </Router>
    </AppContext.Provider>
  );
};

export default App;

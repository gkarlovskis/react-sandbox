import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import { Router, Switch } from "react-router-dom";
import history from "./helpers/browser-history";
import LoginPage from "./containers/LoginPage";
import SignUpPage from "./containers/SignUpPage";
import Header from "./components/Header";
import Dashboard from "./containers/Dashboard";
import { AppContext } from "./helpers/app-context";
import { isLoggedIn } from "./services/authentication-service";
import { AuthRoute, HomeRoute, NonAuthRoute } from "./helpers/router";
export interface IAppProps {}

export interface IAppState {
  isLoggedIn: boolean;
}

class App extends Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    isLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        this.setState({ isLoggedIn: true });
      } else {
        this.setState({ isLoggedIn: false });
      }
    });
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <Router history={history}>
          <Header />
          <Switch>
            <NonAuthRoute
              isLogged={this.state.isLoggedIn}
              path={"/sign-in"}
              component={LoginPage}
            />
            <NonAuthRoute
              isLogged={this.state.isLoggedIn}
              path={"/sign-up"}
              component={SignUpPage}
            />
            <AuthRoute
              isAllowed={this.state.isLoggedIn}
              exact
              path="/dashboard"
              component={Dashboard}
            />
            <HomeRoute
              isLogged={this.state.isLoggedIn}
              path={"/"}
              component={Dashboard}
            />
          </Switch>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;

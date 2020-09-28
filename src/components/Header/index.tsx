import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../helpers/app-context";
import { logout } from "../../services/authentication-service";

const Header = () => {
  const ctx = React.useContext(AppContext);

  const logOut = () => {
    logout();
  };

  const buttonsList = () => {
    if (ctx.isLoggedIn) {
      return (
        <li className="nav-item">
          <Link className="nav-link" to="" onClick={logOut}>
            Log out
          </Link>
        </li>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to={"/sign-in"}>
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/sign-up"}>
              Sign up
            </Link>
          </li>
        </>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container">
        <Link className="navbar-brand" to={"/dashboard"}>
          {ctx.isLoggedIn ? "Dashboard" : "React Sandbox"}
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">{buttonsList()}</ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

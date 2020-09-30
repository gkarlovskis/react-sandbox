import React, { Component } from "react";
import { connect } from "react-redux";
import { IDashboardPageProps } from "../../interfaces/props/i-dashboard-page-props";
import { TAppState } from "../../redux-store/types/t-app-state";

class Dashboard extends Component<IDashboardPageProps> {
  render() {
    return (
      <div
        className="container dashboard-inner"
        style={{ background: "#ffffff", height: "100%" }}
      >
        <h1>Dashboard Page</h1>
        <p>
          Hi, {this.props.user.username}. Your role is {this.props.user.role}
        </p>
      </div>
    );
  }
}

const mapStateToProps = function (state: TAppState) {
  return {
    isLoggedIn: state.isLoggedIn,
    user: state.user,
  };
};

export default connect(mapStateToProps)(Dashboard);

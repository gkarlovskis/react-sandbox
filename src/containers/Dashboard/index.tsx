import React, { Component } from 'react';

export default class Dashboard extends Component {
  render() {
    console.log('Dashboard');
    return (
      <div
        className="container dashboard-inner"
        style={{ background: '#ffffff', height: '100%' }}
      >
        <h1>Dashboard Page</h1>
      </div>
    );
  }
}

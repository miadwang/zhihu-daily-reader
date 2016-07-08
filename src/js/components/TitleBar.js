import React, { Component } from 'react';

class TitleBar extends Component {
  render() {
    return (
      <div>
        <a href="#" className="btn btn-default" id="menu-toggle">Toggle Menu</a>
        <a href="#" className="btn btn-default" id="page-toggle">Toggle Page</a>
        <h1>Latest</h1>
      </div>
    );
  }
}

export default TitleBar;

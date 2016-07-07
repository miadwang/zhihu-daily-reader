import React, { Component } from 'react';

class TitleBar extends Component {
  render() {
    return (
      <div>
        <a href="#menu-toggle" className="btn btn-default" id="menu-toggle">Toggle Menu</a>
        <h1>Latest</h1>
      </div>
    );
  }
}

export default TitleBar;

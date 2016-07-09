import React, { Component, PropTypes } from 'react';

class NavBar extends Component {
  render() {
    return (
      <div  className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" onClick={this.props.actions.toggleSideBar}>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">知乎日报</a>
          </div>
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  actions: PropTypes.object.isRequired
};

export default NavBar;

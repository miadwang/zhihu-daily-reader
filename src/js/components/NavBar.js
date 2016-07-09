import React, { Component, PropTypes } from 'react';

class NavBar extends Component {
  render() {
    return (
      <div>
        <a href="#">知乎日报</a>
          <button type="button" onClick={this.props.actions.toggleSideBar}>X
          </button>
      </div>
    );
  }
}

NavBar.propTypes = {
  actions: PropTypes.object.isRequired
};

export default NavBar;

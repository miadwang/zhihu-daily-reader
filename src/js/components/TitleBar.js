import React, { Component, PropTypes } from 'react';

class TitleBar extends Component {
  render() {
    return (
      <div className="title-bar-wrapper">
        <a href="#">知乎日报</a>
        <button type="button" onClick={this.props.actions.toggleSideBar}>
          X
        </button>
      </div>
    );
  }
}

TitleBar.propTypes = {
  actions: PropTypes.object.isRequired
};

export default TitleBar;

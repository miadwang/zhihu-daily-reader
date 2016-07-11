import React, { Component, PropTypes } from 'react';

class TitleBar extends Component {
  render() {
    return (
      <div className="title-bar">
        <button type="button" onClick={this.props.actions.toggleSideBar}>
          X
        </button>
        <a href='#'>今日热文</a>
      </div>
    );
  }
}

TitleBar.propTypes = {
  actions: PropTypes.object.isRequired
};

export default TitleBar;

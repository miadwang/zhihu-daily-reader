import React, { Component, PropTypes } from 'react';

class TitleBar extends Component {
  render() {
    return (
      <div className="title-bar">
        {
          this.props.layout.articleDetailIsActive ? (
            <button type="button" className="button-back" onClick={this.props.actions.hideArticleDetail}>
              Back
            </button>
          ) : (
            <button type="button" className="button-menu" onClick={this.props.actions.toggleSideBar}>
            &#9776;
            </button>
          )
        }

        {
          !this.props.layout.articleDetailIsActive ? (
            <a href='#'>今日热文</a>
          ) : null
        }
      </div>
    );
  }
}

TitleBar.propTypes = {
  actions: PropTypes.object.isRequired,
  layout: PropTypes.shape({
    articleDetailIsActive: PropTypes.bool.isRequired
  }).isRequired,
};

export default TitleBar;

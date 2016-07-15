import React, { Component, PropTypes } from 'react';

class TitleBar extends Component {
  render() {
    return (
      <div className="title-bar">
        {
          this.props.layout.articleDetailIsActive ? (
            <button type="button" className="button-back" onClick={() => {
              this.context.router.goBack();
              this.props.actions.hideArticleDetail();
            }}>
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
            <a href='#'>{this.props.titleBar.theme}</a>
          ) : null
        }
      </div>
    );
  }
}

TitleBar.propTypes = {
  titleBar: PropTypes.shape({
    theme: PropTypes.string.isRequired,
    themeId: PropTypes.number.isRequired
  }).isRequired,
  actions: PropTypes.object.isRequired,
  layout: PropTypes.shape({
    articleDetailIsActive: PropTypes.bool.isRequired
  }).isRequired,
};

TitleBar.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default TitleBar;

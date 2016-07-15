import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class TitleBar extends Component {
  render() {
    var divStyle = {
      opacity: this.props.titleBar.backgroundOpacity
    };

    if (this.props.layout.articleDetailIsActive) {
      divStyle = {
        display: 'none'
      };
    } else if (this.props.titleBar.themeImage.length > 0) {
      divStyle = {...divStyle,
        backgroundImage:
        `url(${this.props.titleBar.themeImage.replace(/http:\/\/(pi?c?\d)\.zhimg\.com/, 'https://yuanotes-zhihudaily-proxy.daoapp.io/$1')})`,
        WebkitFilter: 'blur(5px)'
      };
    }

    return (
      <div className="title-bar">
        <div className="title-bar-text">
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
            <Link to={'/themes/' + this.props.titleBar.themeId}>{this.props.titleBar.theme}</Link>
          ) : null
        }
        </div>

        <div className="title-bar-background" style={divStyle}/>
      </div>
    );
  }
}

TitleBar.propTypes = {
  titleBar: PropTypes.shape({
    theme: PropTypes.string.isRequired,
    themeId: PropTypes.number.isRequired,
    themeImage: PropTypes.string,
    backgroundOpacity: PropTypes.number.isRequired
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

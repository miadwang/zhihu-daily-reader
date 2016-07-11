import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class SideBar extends Component {
  render() {
    const divStyle = {
      overflow: 'scroll',
      WebkitOverflowScrolling: 'touch'
    };

    return (
      <div className="side-bar" style={divStyle}>
        <ul className="theme-list">
          <li>
            <Link to="/" onClick={
              () => {
                this.props.actions.fetchLatestArticleList();
                this.props.actions.hideArticleDetail();
                this.props.actions.hideSideBar();
              }
            }>
              首页
            </Link>
          </li>

          {
            this.props.themeList.themes.map((theme, key) => {
              return (
                <li key={key}>
                  <Link to={'/themes/' + theme.id} onClick={
                    () => {
                      this.props.actions.fetchThemeArticleList(theme.id);
                      this.props.actions.hideArticleDetail();
                      this.props.actions.hideSideBar();
                    }
                  }>
                    {theme.name}
                  </Link>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

SideBar.propTypes = {
  themeList: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    error: PropTypes.object,
    themes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.ifRequired
    }).isRequired).isRequired
  }),
  actions: PropTypes.object.isRequired
};

export default SideBar;

import React, { Component, PropTypes } from 'react';

class SideBar extends Component {
  render() {
    return (
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
        <li className="sidebar-brand">
          <a href='#' onClick={this.props.actions.fetchThemeArticleList}>
            首页
          </a>
        </li>

        {
          this.props.themeList.themes.map((theme, key) => {
            return (
              <li className="sidebar-brand" key={key}>
                <a href='#' onClick={this.props.actions.fetchThemeArticleList}>
                  {theme.name}
                </a>
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
    themes: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
  }),
  actions: PropTypes.object.isRequired
};

export default SideBar;

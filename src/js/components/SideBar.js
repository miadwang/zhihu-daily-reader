import React, { Component, PropTypes } from 'react';

class SideBar extends Component {
  render() {
    return (
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
        <li className="sidebar-brand">
          <a href='#' onClick={this.props.actions.fetchThemeArticles}>
            首页
          </a>
        </li>

        {
          this.props.theme.themeList.map((theme, key) => {
            return (
              <li className="sidebar-brand" key={key}>
                <a href='#' onClick={this.props.actions.fetchThemeArticles}>
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
  theme: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    error: PropTypes.object,
    themeList: PropTypes.array.isRequired
  }).isRequired,
  actions: PropTypes.object.isRequired
};

export default SideBar;

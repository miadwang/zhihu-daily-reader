import React, { Component } from 'react';

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
          this.props.themes.themes.map((theme, key) => {
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

export default SideBar;

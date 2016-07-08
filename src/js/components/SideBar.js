import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class SideBar extends Component {
  render() {
    return (
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
        <li className="sidebar-brand">
          <Link to='/' onClick={this.props.actions.fetchLatestArticleList}>
            首页
          </Link>
        </li>

        {
          this.props.themeList.themes.map((theme, key) => {
            return (
              <li className="sidebar-brand" key={key}>
                <Link to={'/themes/' + theme.id} onClick={
                  () => {
                    this.props.actions.fetchThemeArticleList(theme.id);
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

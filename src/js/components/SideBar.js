import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class SideBar extends Component {
  render() {
    return (
      <div className={'side-bar-wrapper' + (() => {
        if (this.props.layout.sideBarIsActive) return ' side-bar-active';
        else return '';
      })()}>
        <ul className="theme-list">
          <li>
            <Link to="/" onClick={this.props.actions.fetchLatestArticleList}>
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
  layout: PropTypes.shape({
    sideBarIsActive: PropTypes.bool.isRequired
  }).isRequired,
  actions: PropTypes.object.isRequired
};

export default SideBar;

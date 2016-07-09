import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class SideBar extends Component {
  render() {
    return (
      <div className="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar" role="navigation">
        <div data-spy="affix" data-offset-top="45" data-offset-bottom="90">
          <ul className="nav" id="sidebar-nav">
            <li>
              <Link to='/' onClick={this.props.actions.fetchLatestArticleList}>
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
    }).isRequired).isRequired,
    isHide: PropTypes.bool.isRequired
  }),
  actions: PropTypes.object.isRequired
};

export default SideBar;

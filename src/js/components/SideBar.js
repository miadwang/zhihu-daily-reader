import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {findDOMNode} from 'react-dom';

class SideBar extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.layout.sideBarIsActive) {
      const sidebar = findDOMNode(this.refs.sidebar);
      sidebar.scrollTop = 0;
    }
  }

  render() {
    const divStyle = {
      overflowY: 'scroll',
      overflowX: 'hidden',
      WebkitOverflowScrolling: 'touch'
    };

    return (

      <div ref="sidebar" className="side-bar" style={divStyle}>
        <h1>
          知乎日报阅读器
        </h1>
        <ul className="theme-list">
          <li>
            <Link to="/" onClick={
              () => {
                this.props.actions.fetchLatestArticleList();
                this.props.actions.hideArticleDetail();
                this.props.actions.hideSideBar();
              }
            }>
              今日热文
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
  layout: PropTypes.shape({
    sideBarIsActive: PropTypes.bool.isRequired
  }).isRequired,
  actions: PropTypes.object.isRequired
};

export default SideBar;

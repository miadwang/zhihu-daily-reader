import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions';
import Loading from 'react-loading-animation';
import TopArticleSlider from '../components/TopArticleSlider';
import ArticleList from '../components/ArticleList';
import Footer from '../components/Footer';
import { findDOMNode } from 'react-dom';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      main: null,
      scrollHeight: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.state.main = findDOMNode(this.refs.main);
    const sliderHeight = findDOMNode(this.refs.slider).offsetHeight;
    this.state.scrollHeight = sliderHeight - 50;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.theme !== nextProps.theme) {
      this.state.main.scrollTop = 0;
    }
  }

  handleReload() {
    if (this.props.theme === '今日热文') this.props.actions.fetchLatestArticleList();
    else this.props.actions.fetchThemeArticleList(this.props.titleBar.themeId);
  }

  handleScroll() {
    if (this.props.theme === '今日热文') {
      var opacity = this.state.main.scrollTop / this.state.scrollHeight;
      this.props.actions.changeTitleBarOpacity(opacity);
    }
  }

  render() {
    const divStyle = {
      overflowY: 'scroll',
      overflowX: 'hidden',
      WebkitOverflowScrolling: 'touch'
    };

    return (
      <div ref="main" className="main" style={divStyle}>

        {
          this.props.articleList.fetching ? (
            <div className="loading-wrapper under-main">
              <Loading/>
            </div>
          ) : null
        }

        {
          this.props.articleList.error ? (
            <div className="loading-wrapper under-main">
              <p>
                服务器开小差了，请点击<button type="button" onClick={this.handleReload.bind(this)}>这里</button>重试~
              </p>
            </div>
          ) : null
        }

        <div className="article-list-wrapper" onScroll={this.handleScroll} onWheel={this.handleScroll}
        onTouchMove={this.handleScroll}>
          {
            this.props.layout.sideBarIsActive ? (
              <div className="frozer" onClick={this.props.actions.toggleSideBar}/>
            ) : null
          }

          {
            (this.props.theme === '今日热文') ? <TopArticleSlider ref="slider" topArticleItems={this.props.articleList.topArticleItems} articleListIsFetched={this.props.articleList.fetched} actions={this.props.actions}/> : null
          }

          <ArticleList articleList={this.props.articleList} theme={this.props.theme} actions={this.props.actions}/>

          <Footer actions={this.props.actions}/>
        </div>

        {this.props.children}
      </div>
    );
  }
}

Main.propTypes = {
  articleList: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    error: PropTypes.object,
    topArticleItems: PropTypes.arrayOf(PropTypes.object)
  }),
  theme: PropTypes.string.isRequired,
  layout: PropTypes.shape({
    sideBarIsActive: PropTypes.bool.isRequired,
    articleDetailIsActive: PropTypes.bool.isRequired
  }).isRequired,
  children: PropTypes.node,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    theme: state.titleBar.theme,
    articleList: state.articleList,
    layout: state.layout
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions';
import TitleBar from '../components/TitleBar';
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
      titleBarBg: null,
      scrollHight: 0
    };
  }

  componentDidMount() {
    this.state.main = findDOMNode(this.refs.main);
    this.state.titleBarBg = findDOMNode(this.refs.titleBarBg);
    const sliderHeight = findDOMNode(this.refs.slider).offsetHeight;
    this.state.scrollHeight = sliderHeight - 50;
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.layout.articleDetailIsActive && !nextProps.layout.articleDetailIsActive) {
      this.state.main.scrollTop = 0;
    }
  }

  handleReload() {
    if (this.props.titleBar.theme === '今日热文') this.props.actions.fetchLatestArticleList();
    else this.props.actions.fetchThemeArticleList(this.props.titleBar.themeId);
  }

  handleScroll() {
    if (this.state.titleBarBg.style.opacity < 1) {
      this.state.titleBarBg.style.opacity = this.state.main.scrollTop / this.state.scrollHeight;
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

        <TitleBar ref="titleBar" titleBar={this.props.titleBar} actions={this.props.actions} layout={this.props.layout}/>

        <div className="title-bar-background" ref="titleBarBg"/>

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

        <div className="article-list-wrapper" onScroll={this.handleScroll.bind(this)} onWheel={this.handleScroll.bind(this)}>
          {
            this.props.layout.sideBarIsActive ? (
              <div className="frozer" onClick={this.props.actions.toggleSideBar}/>
            ) : null
          }

          {
            (this.props.titleBar.theme === '今日热文') ? <TopArticleSlider ref="slider" topArticleItems={this.props.articleList.topArticleItems} articleListIsFetched={this.props.articleList.fetched} actions={this.props.actions}/> : null
          }

          <ArticleList articleList={this.props.articleList} actions={this.props.actions}/>

          <Footer actions={this.props.actions}/>
        </div>

        {this.props.children}
      </div>
    );
  }
}

Main.propTypes = {
  titleBar: PropTypes.shape({
    theme: PropTypes.string.isRequired,
    themeId: PropTypes.number.isRequired
  }).isRequired,
  articleList: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    error: PropTypes.object,
    topArticleItems: PropTypes.arrayOf(PropTypes.object)
  }),
  layout: PropTypes.shape({
    sideBarIsActive: PropTypes.bool.isRequired,
    articleDetailIsActive: PropTypes.bool.isRequired
  }).isRequired,
  children: PropTypes.node,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    titleBar: state.titleBar,
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

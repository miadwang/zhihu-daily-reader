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
  componentWillReceiveProps(nextProps) {
    if (this.props.layout.articleDetailIsActive && nextProps.layout.articleDetailIsActive) {
      const main = findDOMNode(this.refs.main);
      main.scrollTop = 0;
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
        <div className="article-list-wrapper">
          {
            this.props.layout.sideBarIsActive ? (
              <div className="frozer" onClick={this.props.actions.toggleSideBar}/>
            ) : null
          }

          {
            this.props.articleList.fetched ? (
              <div className="loading-wrapper">
                <Loading/>
              </div>
            ) : null
          }

          {
            (this.props.articleList.theme === '今日热文') ? <TopArticleSlider ref="slider" topArticleItems={this.props.articleList.topArticleItems} actions={this.props.actions}/> : null
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
  articleList: PropTypes.object,
  layout: PropTypes.shape({
    sideBarIsActive: PropTypes.bool.isRequired,
    articleDetailIsActive: PropTypes.bool.isRequired
  }).isRequired,
  children: PropTypes.node,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
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

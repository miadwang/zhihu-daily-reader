import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions';
import Loading from 'react-loading-animation';
import TopArticleSlider from '../components/TopArticleSlider';
import ArticleList from '../components/ArticleList';
import Footer from '../components/Footer';

class Main extends Component {
  render() {
    const divStyle = {
      overflowY: 'scroll',
      overflowX: 'hidden',
      WebkitOverflowScrolling: 'touch'
    };

    //Disable srolling (x & y) when sidebar is active. Otherwise the sidebar cannot scroll smoothly. Don't know why!!!TODO
    if (this.props.layout.sideBarIsActive) {
      divStyle.position = 'fixed';
      divStyle.overflow = 'hidden';
    }

    return (
      <div className="main" style={divStyle}>
        {
          this.props.articleList.fetching ? (
            <div className="loading-wrapper">
              <Loading/>
            </div>
          ) : null
        }

        {
          (this.props.articleList.theme === '今日热文') ? <TopArticleSlider topArticleItems={this.props.articleList.topArticleItems} actions={this.props.actions}/> : null
        }

        <ArticleList articleList={this.props.articleList} actions={this.props.actions}/>

        <Footer actions={this.props.actions}/>

        {this.props.children}
      </div>
    );
  }
}

Main.propTypes = {
  articleList: PropTypes.object,
  layout: PropTypes.shape({
    sideBarIsActive: PropTypes.bool.isRequired
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

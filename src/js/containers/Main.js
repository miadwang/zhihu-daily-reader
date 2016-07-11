import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions';
import Loading from 'react-loading-animation';
import TopArticleSlider from '../components/TopArticleSlider';
import ArticleList from '../components/ArticleList';
import TitleBar from '../components/TitleBar';
import Footer from '../components/Footer';

class Main extends Component {
  render() {
    return (
      <div className="main">
        <TitleBar actions={this.props.actions}/>

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
  children: PropTypes.node,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    articleList: state.articleList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

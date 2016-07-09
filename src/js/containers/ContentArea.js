import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions';
import ArticleList from '../components/ArticleList';

class ContentArea extends Component {
  render() {
    return (
      <div className={'content-area-wrapper' + (() => {
        if (this.props.layout.articleDetailIsActive) return ' article-detail-active';
        else return '';
      })()}>
        <ArticleList articleList={this.props.articleList} actions={this.props.actions}/>

        {this.props.children}
      </div>
    );
  }
}

ContentArea.propTypes = {
  articleList: PropTypes.object,
  articleDetails: PropTypes.object,
  layout: PropTypes.shape({
    articleDetailIsActive: PropTypes.bool.isRequired
  }).isRequired,
  children: PropTypes.node,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    articleList: state.articleList,
    articleDetail: state.articleDetail,
    layout: state.layout,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentArea);

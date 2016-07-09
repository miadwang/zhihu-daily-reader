import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions';
import ArticleList from '../components/ArticleList';

class ContentArea extends Component {
  render() {
    return (
      <div className="content-area-wrapper">
        <ArticleList articleList={this.props.articleList} actions={this.props.actions}/>

        {this.props.children}
      </div>
    );
  }
}

ContentArea.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ContentArea);

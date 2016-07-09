import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions';

class ArticleDetail extends Component {
  createMarkup(html) {
    if (this.props.articleDetail.fetching) return {
      __html: ''
    };
    else return {
      __html: html
    };
  }

  render() {
    return (
      <div className={'article-detail-wrapper' + (() => {
        if (this.props.layout.articleDetailIsActive) return ' article-detail-active';
        else return '';
      })()}>
        <button type="button" onClick={this.props.actions.hideArticleDetail}>
          X
        </button>

        <div className="article-detail" dangerouslySetInnerHTML={this.createMarkup(this.props.articleDetail.body)}/>
      </div>
    );
  }
}

ArticleDetail.propTypes = {
  articleDetail: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    error: PropTypes.object,
    body: PropTypes.string.isRequired
  }).isRequired,
  layout: PropTypes.shape({
    articleDetailIsActive: PropTypes.bool.isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    articleDetail: state.articleDetail,
    layout: state.layout
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);

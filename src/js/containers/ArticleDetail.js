import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';

import actions from '../actions';

class ArticleDetail extends Component {
  componentWillReceiveProps(nextProps){
    const iframe = findDOMNode(this.refs.iframe);
    const doc = iframe.contentDocument;

    if (nextProps.articleDetail.body.length > 0)  {
      doc.body.innerHTML = nextProps.articleDetail.body.replace('<div class="img-place-holder"></div>', `<img src=${nextProps.articleDetail.img}>`);
      doc.head.innerHTML = `<link rel="stylesheet" href="${nextProps.articleDetail.css[0]}">`;
    }
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

        <div className="article-detail">
          <iframe ref="iframe" frameBorder="0" scrolling="auto" width="100%" height="100%"/>
        </div>
      </div>
    );
  }
}

ArticleDetail.propTypes = {
  articleDetail: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    error: PropTypes.object,
    body: PropTypes.string.isRequired,
    css: PropTypes.array.isRequired,
    img: PropTypes.string,
    imgSource: PropTypes.string
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

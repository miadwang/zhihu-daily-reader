import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';

import actions from '../actions';
import Loading from 'react-loading-animation';

class ArticleDetail extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.articleDetail.fetching && nextProps.articleDetail.fetched)  {
      let html = `<div class="img-place-holder" style="
        background-image: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%),url(${nextProps.articleDetail.img});
        background-image: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,255,255,0)), color-stop(100%, rgba(0,0,0,0.5))),url(${nextProps.articleDetail.img});
        background-image: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%),url(${nextProps.articleDetail.img});
        background-image: -o-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%),url(${nextProps.articleDetail.img});
        background-image: -ms-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%),url(${nextProps.articleDetail.img});
        background-image: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%),url(${nextProps.articleDetail.img});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        position: relative
      ">

        <h1 style="
          margin: 0;
          position: absolute;
          bottom:  18px;
          margin-left: 20px;
          margin-right: 20px;
          color: white;
          font-size: 20px;
          font-weight: normal
        ">
          ${nextProps.articleDetail.title}
        </h1>

        <h2 style="
          margin: 0 20px;
          position: absolute;
          bottom: 8px;
          right: 0;
          font-size: 9px;
          text-align: right;
          color: white;
          font-weight: 200
        ">
          图片：${nextProps.articleDetail.imgSource}
        </h2>`;

      const iframe = findDOMNode(this.refs.iframe);
      const doc = iframe.contentDocument;
      doc.body.innerHTML = nextProps.articleDetail.body.replace('<div class="img-place-holder">', html);
      doc.body.scrollTop = 0;
      doc.head.innerHTML = `<link rel="stylesheet" href="${nextProps.articleDetail.css[0]}">`;
    }
  }

  render() {
    return (
      <div className={'article-detail-wrapper' + (this.props.layout.articleDetailIsActive ? ' article-detail-active' : '')}>
        <button type="button" onClick={this.props.actions.hideArticleDetail}>
        X
        </button>

        <div className="article-detail">
          {
            this.props.articleDetail.fetching ? (
              <div className="loading-wrapper">
                <Loading/>
              </div>
            ) : null
          }
          <iframe ref="iframe" frameBorder="0" scrolling="auto"/>
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
    imgSource: PropTypes.string,
    title: PropTypes.string
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

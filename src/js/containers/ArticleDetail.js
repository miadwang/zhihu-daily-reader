import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';

import actions from '../actions';
import Loading from 'react-loading-animation';

import '../../css/zhihu.css';

class ArticleDetail extends Component {
  // constructor() {
  //   super();
  //   this.preventMainScroll = this.preventMainScroll.bind(this);
  // }
  //
  componentDidMount() {
    const innerHtml = findDOMNode(this.refs.innerHtml);

    innerHtml.addEventListener('scroll', this.preventMainScroll);
    innerHtml.addEventListener('touchstart', this.preventMainScroll);
    innerHtml.addEventListener('wheel', this.preventMainScroll);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.layout.articleDetailIsActive) {
      const detail = findDOMNode(this.refs.detail);
      detail.scrollTop = 0;
    }
  }
  //
  preventMainScroll(e) {
    console.log('inner', e.type)
    e.stopPropagation();
  }

  createMarkup(html) {
    return {
      __html: html
    };
  }

  render() {
    const divStyle = {
      overflowY: 'scroll',
      overflowX: 'hidden',
      WebkitOverflowScrolling: 'touch'
    };

    return (
      <div ref="detail" style={divStyle} className={'article-detail-wrapper' + (this.props.layout.articleDetailIsActive ? ' article-detail-active' : '')}>

        {
          this.props.articleDetail.fetching ? (
            <div className="loading-wrapper">
            <Loading/>
            </div>
          ) : null
        }

        <div className="article-detail">
          <div className="image" style={{
            // backgroundImage: `-moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%),url(${nextProps.articleDetail.img})`,
            // backgroundImage: `-webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,255,255,0)), color-stop(100%, rgba(0,0,0,0.5))),url(${nextProps.articleDetail.img})`,
            // backgroundImage: `-webkit-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%),url(${nextProps.articleDetail.img})`,
            // backgroundImage: `-o-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%),url(${nextProps.articleDetail.img})`,
            // backgroundImage: `-ms-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%),url(${nextProps.articleDetail.img})`,
            backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%),url(${this.props.articleDetail.img.replace(/http:\/\/pic(\d)\.zhimg\.com/, 'https://yuanotes-zhihudaily-proxy.daoapp.io/pic$1')})`
          }}>
            <h1>{this.props.articleDetail.title}</h1>
            <h2>图片：{this.props.articleDetail.imgSource}</h2>
          </div>

          <div className="inner-html" ref="innerHtml" dangerouslySetInnerHTML={this.createMarkup(this.props.articleDetail.body.replace(/https?:\/\/pic(\d)\.zhimg\.com/g, 'https://yuanotes-zhihudaily-proxy.daoapp.io/pic$1'))}/>
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

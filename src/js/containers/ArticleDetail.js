import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';

import actions from '../actions';
import Loading from 'react-loading-animation';

import '../../css/zhihu.css';

class ArticleDetail extends Component {
  constructor() {
    super();
    this.state = {
      touchStartXPos: 0
    };
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleScrollInLoading = this.handleScrollInLoading.bind(this);
  }

  handleTouchStart(e) {
    this.setState({
      touchStartXPos: e.touches[0].pageX,
    });
  }

  handleTouchEnd(e) {
    const xPos = e.changedTouches[0].pageX;
    const deltaX = xPos - this.state.touchStartXPos;

    if (deltaX > 100) {
      this.context.router.goBack();
      this.props.actions.hideArticleDetail();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.layout.articleDetailIsActive) {
      const detail = findDOMNode(this.refs.detail);
      detail.scrollTop = 0;
    }
  }

  createMarkup(html) {
    return {
      __html: html
    };
  }

  handleReload() {
    this.props.actions.fetchArticleDetail(this.props.articleDetail.id);
  }

  handleScrollInLoading(e) {
    e.preventDefault();
  }

  render() {
    const divStyle = {
      overflowY: 'scroll',
      overflowX: 'hidden',
      WebkitOverflowScrolling: 'touch'
    };

    return (
      <div ref="detail" style={divStyle} className={'article-detail-wrapper' + (this.props.layout.articleDetailIsActive ? ' article-detail-active' : '')} onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd}>

        {
          this.props.articleDetail.fetching ? (
            <div className="loading-wrapper" onScroll={this.handleScrollInLoading} onWheel={this.handleScrollInLoading}>
              <Loading/>
            </div>
          ) : null
        }

        {
          this.props.articleDetail.error ? (
            <div className="loading-wrapper">
              <p>
                服务器开小差了，请点击<button type="button" onClick={this.handleReload.bind(this)}>这里</button>重试~
              </p>
            </div>
          ) : null
        }


        <div className="article-detail">
          {
            this.props.articleDetail.img ?
            <div className="image" style={{
              // backgroundImage: `-moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%),url(${nextProps.articleDetail.img})`,
              // backgroundImage: `-webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,255,255,0)), color-stop(100%, rgba(0,0,0,0.5))),url(${nextProps.articleDetail.img})`,
              // backgroundImage: `-webkit-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%),url(${nextProps.articleDetail.img})`,
              // backgroundImage: `-o-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%),url(${nextProps.articleDetail.img})`,
              // backgroundImage: `-ms-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%),url(${nextProps.articleDetail.img})`,
              backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%),url(${ this.props.articleDetail.img.replace(/http:\/\/pic(\d)\.zhimg\.com/, 'https://zhihuproxy.daoapp.io/pic$1')})`
            }}>
              <h1>{this.props.articleDetail.title}</h1>
              <h2>图片：{this.props.articleDetail.imgSource}</h2>
            </div> : null
          }

          <div className="inner-html" ref="innerHtml" dangerouslySetInnerHTML={this.createMarkup(this.props.articleDetail.body.replace(/https?:\/\/(p(ic)?\d)\.zhimg\.com/g, 'https://zhihuproxy.daoapp.io/$1'))}/>
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
    title: PropTypes.string,
    id: PropTypes.number.isRequired
  }).isRequired,
  layout: PropTypes.shape({
    articleDetailIsActive: PropTypes.bool.isRequired
  }).isRequired
};

ArticleDetail.contextTypes = {
  router: React.PropTypes.object.isRequired
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

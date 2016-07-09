import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions';

class ArticleDetail extends Component {
  createMarkup(html) {
    return {
      __html: html
    };
  }

  render() {
    return (
      <div className="article-detail-wrapper">
        <button type="button" onClick={this.props.actions.toggleArticleDetail}>
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
  }).isRequired
};

function mapStateToProps(state) {
  return {articleDetail: state.articleDetail};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);

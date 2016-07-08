import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions';

class ArticleDetails extends Component {
  createMarkup(html) {
    return {
      __html: html
    };
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={this.createMarkup(this.props.article.body)}/>
    );
  }
}

ArticleDetails.propTypes = {
  article: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    error: PropTypes.object,
    body: PropTypes.string.isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {article: state.article};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetails);

import React, { Component } from 'react';
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
      <div dangerouslySetInnerHTML={this.createMarkup(this.props.body)}/>
    );
  }
}

function mapStateToProps(state) {
  return state.article;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetails);

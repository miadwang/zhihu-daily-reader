import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions';
import ArticleItem from '../components/ArticleItem';

class ArticleList extends Component {
  render() {
    return (
      <div id="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <ul className="col-lg-12">
              {
                this.props.articleList.articleItems.map((articleItem, key) => <ArticleItem key={key} articleItem={articleItem} actions={this.props.actions}/>
                )
              }
            </ul>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
            {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ArticleList.propTypes = {
  articleList: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    date: PropTypes.string.isRequired,
    topArticleItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    articleItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    error: PropTypes.object
  }),
  children: PropTypes.node,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {articleList: state.articleList};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);

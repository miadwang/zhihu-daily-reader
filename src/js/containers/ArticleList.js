import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions';
import Article from '../components/Article';

class ArticleList extends Component {
  render() {
    return (
      <div id="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <ul className="col-lg-6">
              {
                this.props.latest.articles.map((article, key) => <Article key={key} article={article} actions={this.props.actions}/>
                )
              }
            </ul>
            <div className="col-lg-6">
            {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Article.propTypes = {
  latest: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    date: PropTypes.string.isRequired,
    topArticles: PropTypes.arrayOf(PropTypes.object).isRequired,
    articles: PropTypes.arrayOf(PropTypes.object).isRequired,
    error: PropTypes.object
  }),
  children: PropTypes.node,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {latest: state.latest};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);

import React, { Component, PropTypes } from 'react';

import ArticleItem from './ArticleItem';

class ArticleList extends Component {
  render() {
    return (
      <ul className="article-list">
        {
          this.props.articleList.articleItems.map((articleItem, key) => <ArticleItem key={key} articleItem={articleItem} actions={this.props.actions}/>)
        }
      </ul>
    );
  }
}

ArticleList.propTypes = {
  articleList: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    date: PropTypes.string.isRequired,
    error: PropTypes.object,
    topArticleItems: PropTypes.arrayOf(PropTypes.object),
    articleItems: PropTypes.arrayOf(PropTypes.object).isRequired
  }),
  children: PropTypes.node,
  actions: PropTypes.object.isRequired
};

export default ArticleList;

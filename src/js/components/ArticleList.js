import React, { Component, PropTypes } from 'react';

import ArticleItem from './ArticleItem';

class ArticleList extends Component {
  render() {
    return (
      <div className="article-list-wrapper">
        <ul className="article-list">
          {
            (() => {
              if (this.props.articleList.fetching) return '';
              else return this.props.articleList.articleItems.map((articleItem, key) => <ArticleItem key={key} articleItem={articleItem} actions={this.props.actions}/>);
            })()
          }
        </ul>
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

export default ArticleList;

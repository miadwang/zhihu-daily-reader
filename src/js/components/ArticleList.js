import React, { Component, PropTypes } from 'react';

import Loading from 'react-loading-animation';
import ArticleItem from './ArticleItem';
import TopArticleSlider from './TopArticleSlider';

class ArticleList extends Component {
  render() {
    return (
      <div className="article-list-wrapper">
        {
          this.props.articleList.fetching ? (
            <div className="loading-wrapper">
              <Loading/>
            </div>
          ) : null
        }

        {
          (this.props.articleList.theme === '今日热文') ? <TopArticleSlider topArticleItems={this.props.articleList.topArticleItems} actions={this.props.actions}/> : null
        }

        <ul className="article-list">
          {
            this.props.articleList.articleItems.map((articleItem, key) => <ArticleItem key={key} articleItem={articleItem} actions={this.props.actions}/>)
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
    error: PropTypes.object,
    topArticleItems: PropTypes.arrayOf(PropTypes.object),
    articleItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    theme: PropTypes.string.isRequired
  }),
  children: PropTypes.node,
  actions: PropTypes.object.isRequired
};

export default ArticleList;

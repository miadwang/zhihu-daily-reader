import React, { Component, PropTypes } from 'react';

import ArticleItem from './ArticleItem';

class ArticleList extends Component {
  constructor() {
    super();
    this.state = {
      touchStartXPos: 0
    };
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  }

  handleTouchStart(e) {
    this.setState({
      touchStartXPos: e.touches[0].pageX,
    });
  }

  handleTouchEnd(e) {
    const xPos = e.changedTouches[0].pageX;
    const deltaX = xPos - this.state.touchStartXPos;

    if (deltaX > 100 && window.innerWidth <= 600) this.props.actions.toggleSideBar();
  }

  render() {
    const divStyle = {
      marginTop: (this.props.theme === '今日热文' ? '' : '50px')
    };
    return (
      <ul className="article-list" style={divStyle} onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd}>
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
  theme: PropTypes.string.isRequired,
  children: PropTypes.node,
  actions: PropTypes.object.isRequired
};

export default ArticleList;

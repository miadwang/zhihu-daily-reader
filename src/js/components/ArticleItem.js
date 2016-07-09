import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class ArticleItem extends Component {
  render() {
    return (
      <li className="article-item">
        <Link to={'/article/' + this.props.articleItem.id} onClick={() => {
          this.props.actions.fetchArticleDetail(this.props.articleItem.id);
          this.props.actions.hideSideBar();
          this.props.actions.showArticleDetail();
        }}>
          {this.props.articleItem.title}
        </Link>
      </li>
    );
  }
}

ArticleItem.propTypes = {
  articleItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  actions: PropTypes.object.isRequired
};

export default ArticleItem;

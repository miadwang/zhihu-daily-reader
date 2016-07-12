import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class ArticleItem extends Component {
  render() {
    const divStyle = {
      backgroundImage: `url(${this.props.articleItem.images[0].replace(/http:\/\/pic(\d)\.zhimg\.com/, 'https://zhihudaily.leanapp.cn/pic$1')})`
    };

    return (
      <li className="article-item">
        <Link to={'/article/' + this.props.articleItem.id} onClick={() => {
          this.props.actions.fetchArticleDetail(this.props.articleItem.id);
          this.props.actions.hideSideBar();
          this.props.actions.showArticleDetail();
        }}>
          <span>
            {this.props.articleItem.title}
          </span>

          {
            this.props.articleItem.images ? <div className="image" style={divStyle}/> : null
          }

        </Link>
      </li>
    );
  }
}

ArticleItem.propTypes = {
  articleItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string.isRequired)
  }).isRequired,
  actions: PropTypes.object.isRequired
};

export default ArticleItem;

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class ArticleItem extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false
    };
  }

  render() {
    return (
      <li className="article-item">
        <Link to={'/article/' + this.props.articleItem.id} className={this.state.clicked ? 'clicked' : ''} onClick={() => {
          this.props.actions.changeArticleId(this.props.articleItem.id);
          this.props.actions.fetchArticleDetail(this.props.articleItem.id);
          this.props.actions.hideSideBar();
          this.props.actions.showArticleDetail();
          this.setState({
            clicked: true
          });
        }}>
          <span>
            {this.props.articleItem.title}
          </span>

          {
            this.props.articleItem.images ? <div className="image" style={{
              backgroundImage: `url(${this.props.articleItem.images[0].replace(/http:\/\/pic(\d)\.zhimg\.com/, 'https://yuanotes-zhihuproxy.daoapp.io/pic$1')})`
            }}/> : null
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

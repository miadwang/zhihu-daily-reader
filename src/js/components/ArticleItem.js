import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import actions from '../actions';

class ArticleItem extends Component {
  render() {

    return (
      <li>
        <Link to={'/article/' + this.props.articleItem.id} onClick={() => {this.props.actions.fetchArticleDetail(this.props.articleItem.id);}}>
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

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import actions from '../actions';

class Article extends Component {
  render() {

    return (
      <li>
        <Link to={'/article/' + this.props.article.id} onClick={() => {this.props.actions.fetchArticle(this.props.article.id);}}>
          {this.props.article.title}
        </Link>
      </li>
    );
  }
}

Article.propTypes = {
  key: PropTypes.number.isRequired,
  article: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  actions: PropTypes.object.isRequired
};

export default Article;

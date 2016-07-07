import React, { Component } from 'react';
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

export default Article;

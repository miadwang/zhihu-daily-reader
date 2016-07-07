import React, { Component } from 'react';

class Article extends Component {
  render() {

    return (
      <li>
        <a href='#' onClick={() => {this.props.actions.fetchArticle(this.props.article.id);}}>
          {this.props.article.title}
        </a>
      </li>
    );
  }
}

export default Article;

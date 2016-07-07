import React, { Component } from 'react';

import Article from './Article';
import ArticleDetails from './ArticleDetails';

class ArticleList extends Component {
  render() {
    return (
      <div id="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <ul className="col-lg-12">
              {
                this.props.latest.articles.map((article, key) => <Article key={key} article={article} actions={this.props.actions}/>
                )
              }
            </ul>
            <ArticleDetails details={this.props.article}/>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleList;

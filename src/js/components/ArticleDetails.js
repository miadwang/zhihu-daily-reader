import React, { Component } from 'react';

class ArticleDetails extends Component {
  createMarkup(html) {
    return {
      __html: html
    };
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={this.createMarkup(this.props.details.body)}/>
    );
  }
}

export default ArticleDetails;

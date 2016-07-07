import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions';
import Article from './Article';

class ArticleList extends Component {
  render() {
    return (
      <div id="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <ul className="col-lg-6">
              {
                this.props.articles.map((article, key) => <Article key={key} article={article} actions={this.props.actions}/>
                )
              }
            </ul>
            <div className="col-lg-6">
            {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.latest;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);

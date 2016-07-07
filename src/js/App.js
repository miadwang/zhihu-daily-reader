import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, IndexRoute } from 'react-router';

import actions from './actions';

import SideBar from './components/SideBar';
import TitleBar from './components/TitleBar';
import ArticleList from './components/ArticleList';

class App extends Component {
  render() {
    return (
      <div id="wrapper">
        <SideBar themes={this.props.themes} actions={this.props.actions}/>
        <TitleBar/>
        <ArticleList latest={this.props.latest} article={this.props.article} actions={this.props.actions}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

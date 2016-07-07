import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, IndexRoute } from 'react-router';

import actions from '../actions';

import SideBar from '../components/SideBar';
import TitleBar from '../components/TitleBar';

class App extends Component {
  render() {
    return (
      <div id="wrapper">
        <SideBar themes={this.props} actions={this.props.actions}/>
        <TitleBar/>

        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.theme;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

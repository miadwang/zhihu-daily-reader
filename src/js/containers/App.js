import React, { Component, PropTypes } from 'react';
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
        <SideBar theme={this.props.theme} actions={this.props.actions}/>
        <TitleBar/>

        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  theme: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    error: PropTypes.object,
    themeList: PropTypes.array.isRequired
  }).isRequired,
  children: PropTypes.node.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {theme: state.theme};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

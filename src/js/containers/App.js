import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, IndexRoute } from 'react-router';

import actions from '../actions';
import SideBar from '../components/SideBar';

class App extends Component {
  render() {
    const divStyle = {
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch'
    };

    return (
      <div className={'app-wrapper' + (this.props.layout.sideBarIsActive ? ' side-bar-active' : '')} style={divStyle}>

        <SideBar themeList={this.props.themeList} layout={this.props.layout} actions={this.props.actions}/>

        {this.props.children}

      </div>
    );
  }
}

App.propTypes = {
  themeList: PropTypes.object,
  articleList: PropTypes.object,
  layout: PropTypes.shape({
    sideBarIsActive: PropTypes.bool.isRequired
  }).isRequired,
  children: PropTypes.node.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    themeList: state.themeList,
    articleList: state.articleList,
    layout: state.layout
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

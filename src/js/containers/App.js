import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, IndexRoute } from 'react-router';

import actions from '../actions';

import TitleBar from '../components/TitleBar';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';

class App extends Component {
  render() {
    return (
      <div className={'page-wrapper' + (() => {
        if (this.props.layout.sideBarIsActive) return ' side-bar-active';
        else return '';
      })()}>
        <TitleBar actions={this.props.actions}/>

        <SideBar themeList={this.props.themeList} layout={this.props.layout} actions={this.props.actions}/>

        {this.props.children}

        <Footer actions={this.props.actions}/>
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

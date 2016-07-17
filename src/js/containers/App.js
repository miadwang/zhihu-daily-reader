import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, IndexRoute } from 'react-router';

import actions from '../actions';
import TitleBar from '../components/TitleBar';
import SideBar from '../components/SideBar';

class App extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this), false);
  }

  handleResize() {
    if (window.innerWidth > 600) {
      this.props.actions.hideSideBar();
    }
  }

  render() {
    return (
      <div className={'app-wrapper' + (this.props.layout.sideBarIsActive ? ' side-bar-active' : '')}>

        <SideBar themeList={this.props.themeList} theme={this.props.theme} layout={this.props.layout} actions={this.props.actions}/>

        <TitleBar ref="titleBar" titleBar={this.props.titleBar} actions={this.props.actions} layout={this.props.layout}/>

        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  titleBar: PropTypes.object,
  theme: PropTypes.string.isRequired,
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
    titleBar: state.titleBar,
    theme: state.titleBar.theme,
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

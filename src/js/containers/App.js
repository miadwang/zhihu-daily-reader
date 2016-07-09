import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, IndexRoute } from 'react-router';

import actions from '../actions';

import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

class App extends Component {
  constructor() {
    super();
    this.hideSideBar = this.hideSideBar.bind(this);
  }
  hideSideBar() {
    if (this.props.themeList.isHide) return '';
    else return ' active';
  }
  render() {
    return (
      <div className="page-container">

        <NavBar actions={this.props.actions}/>

        <div className="container">
          <div className={'row row-offcanvas row-offcanvas-left' + this.hideSideBar()}>

            <SideBar themeList={this.props.themeList} actions={this.props.actions}/>

            {this.props.children}

          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  themeList: PropTypes.object,
  children: PropTypes.node.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {themeList: state.themeList};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

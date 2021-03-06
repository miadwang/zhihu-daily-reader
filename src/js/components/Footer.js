import React, { Component, PropTypes } from 'react';

class Footer extends Component {
  render() {
    return (
      <div className="page-footer">
        Created by Mia Wang using React Redux
      </div>
    );
  }
}

Footer.propTypes = {
  actions: PropTypes.object.isRequired
};

export default Footer;

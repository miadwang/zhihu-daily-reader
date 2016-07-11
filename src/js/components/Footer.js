import React, { Component, PropTypes } from 'react';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        Footer
      </div>
    );
  }
}

Footer.propTypes = {
  actions: PropTypes.object.isRequired
};

export default Footer;

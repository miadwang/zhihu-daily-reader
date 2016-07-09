import React, { Component, PropTypes } from 'react';
import {findDOMNode} from 'react-dom';

class Image extends Component {
  componentWillReceiveProps(nextProps){
    if (nextProps.src.length > 0) {
      let iframe = findDOMNode(this.refs.iframe);
      let doc = iframe.contentWindow.document;
      let body = doc.body;
      body.style.border = '0';
      body.style.margin = '0';
      body.innerHTML = `<img id="img" style="width: 100%" src="${nextProps.src}" />`;
    }
  }
  render() {
    return (
      <iframe ref="iframe"
        src="javascript:;"
        frameBorder="0" scrolling="no"
        width="100%" height="200px">
      </iframe>
    );
  }
}

Image.propTypes = {
  src: PropTypes.string.isRequired
};

export default Image;

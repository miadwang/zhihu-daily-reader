import React, { Component, PropTypes } from 'react';
import {findDOMNode} from 'react-dom';

class Image extends Component {
  componentDidMount() {
    const iframe = findDOMNode(this.refs.iframe);
    let body = iframe.contentDocument.body;
    body.style.margin = '0';

    if (!this.props.title) body.innerHTML = `
      <div style="
        width: 100%;
        height: 100%;
        background-image: url(${this.props.src});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat
      ">
      </div>`;
    else body.innerHTML = `
      <div style="
        width: 100%;
        height: 100%;
        background-image: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%),url(${this.props.src});
        background-image: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,255,255,0)), color-stop(100%, rgba(0,0,0,0.5))),url(${this.props.src});
        background-image: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%),url(${this.props.src});
        background-image: -o-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%),url(${this.props.src});
        background-image: -ms-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%),url(${this.props.src});
        background-image: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%),url(${this.props.src});
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
      ">

        <h1 style="
          margin: 0;
          position: absolute;
          bottom:  18px;
          margin-left: 20px;
          margin-right: 20px;
          color: white;
          font-family: 'Open Sans', arial, sans-serif;
          font-size: 20px;
          font-weight: normal
        ">
          ${this.props.title}
        </h1>
      </div>
    `;
  }

  render() {
    return (
      <iframe ref="iframe" src="javascript:;" frameBorder="0" scrolling="no"/>
    );
  }
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string
};

export default Image;

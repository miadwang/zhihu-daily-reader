import React, { Component, PropTypes } from 'react';

class EditorList extends Component {
  render() {
    const divStyle = {
      marginTop: (this.props.theme === '今日热文' ? '' : '50px')
    };
    return (
      <ul className="editor-list">主编
        {
          this.props.editors.map((editor, key) => <li key={key}><img src={editor.avatar.replace(/http:\/\/pic(\d)\.zhimg\.com/, 'https://zhihuproxy.daoapp.io/pic$1')}/></li>)
        }
      </ul>
    );
  }
}

EditorList.propTypes = {
  editors: PropTypes.arrayOf(PropTypes.shape({
    avatar: PropTypes.string
  })),
};

export default EditorList;

import React, { Component } from 'react';

export default class NoteListPointSubject extends Component {
  render() {
    var styleMap = {
      'border': 'none',
      'fontSize': '1.2em',
      'fontFamily': "'Scope One', serif"
    }
    return (
        <span style={styleMap}>{this.props.subject}</span>
    );
  }
}

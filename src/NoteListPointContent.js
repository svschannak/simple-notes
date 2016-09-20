import React, { Component } from 'react';

export default class NoteListPointContent extends Component {
  render() {
    var styleMap = {
      'border': 'none',
      'fontSize': '1.0em',
      'fontFamily': "'Scope One', serif",
      'color': "#828282",
      'marginTop': '10px'
    }
    return (
        <p style={styleMap}>{this.props.content}</p>
    );
  }
}

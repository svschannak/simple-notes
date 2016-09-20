import React, { Component } from 'react';

export default class SubjectComponent extends Component {
  render() {

    var styleMap = {
      'padding': '15px 30px',
      'border': 'none',
      'fontSize': '1.6em',
      'marginBottom': '0',
      'width': "100%",
      'fontFamily': "'Scope One', serif"
    }

    return (
      <input type="text" style={styleMap} placeholder="Subject of Note" />
    );
  }
}

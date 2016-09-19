import React, { Component } from 'react';

export default class SubjectComponent extends Component {
  render() {

    var styleMap = {
      'padding': '15px 30px',
      'border': 'none',
      'font-size': '1.6em',
      'margin-bottom': '0',
      'width': "100%"
    }

    return (
      <input type="text" style={styleMap} placeholder="Subject of Note" />
    );
  }
}

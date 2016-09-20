import React, { Component } from 'react';
import NoteListPointSubject from './NoteListPointSubject';
import NoteListPointContent from './NoteListPointContent';

export default class NoteListPoint extends Component {
  render() {

    var styleMap = {
      'listStyle': 'none'
    }

    var dividerStyle = {
      'borderBottom': '1px solid #ECECEC',
      'width': '95%',
      'margin': 'auto',
      'marginBottom': '10px'
    }

    return (
      <li style={styleMap}>
        <NoteListPointSubject subject={this.props.note.subject} />
        <NoteListPointContent content={this.props.note.content} />

        <div style={dividerStyle}></div>
      </li>
    );
  }
}

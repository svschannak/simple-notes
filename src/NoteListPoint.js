import React, { Component } from 'react';
import NoteListPointSubject from './NoteListPointSubject';
import NoteListPointContent from './NoteListPointContent';

export default class NoteListPoint extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick(){
    this.props.switchEditorNote(this.props.note.subject, this.props.note.raw_content, this.props.note.id, this.props.note.tags);
  };

  render() {
    var styleMap = {
      'listStyle': 'none',
      'border': '2px solid #000',
      'marginTop': '10px',
      'padding': '10px'
    }

    return (
      <li style={styleMap} className="note-list-point" onClick={this.handleClick.bind(this)} className="list-point">
        <NoteListPointSubject subject={this.props.note.subject} />
        <NoteListPointContent content={this.props.note.plain_content} />
      </li>
    );
  }
}

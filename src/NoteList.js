import React, { Component } from 'react';
import NoteListPoint from './NoteListPoint';

export default class NoteList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      noteList: [
        {
          'id': 1,
          'subject': 'Note1',
          'content': 'Testinhalt'
        },
        {
          'id': 2,
          'subject': 'Note2',
          'content': 'Testinhalt'
        },
        {
          'id': 3,
          'subject': 'Note3',
          'content': 'Testinhalt'
        },
        {
          'id': 4,
          'subject': 'Note4',
          'content': 'Testinhalt'
        },
        {
          'id': 5,
          'subject': 'Note5',
          'content': 'Testinhalt'
        }
      ]
    };
  };

  switchEditorNote(subject, content){
    this.props.changeSubject(subject);
    this.props.changeEditorContent(content);
  }

  render() {
    return (
      <ul>
      {this.state.noteList.map(function(listValue){
        return <NoteListPoint note={listValue} key={listValue.id} switchEditorNote={this.switchEditorNote.bind(this)} />;
      }, this)}
      </ul>
    );
  }
}

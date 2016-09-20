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
        }
      ]
    };
  };

  render() {
    return (
      <ul>
      {this.state.noteList.map(function(listValue){
        return <NoteListPoint note={listValue} key={listValue.id} />;
      })}
      </ul>
    );
  }
}

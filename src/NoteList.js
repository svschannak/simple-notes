import React, { Component } from 'react';
import NoteListPoint from './NoteListPoint';

export default class NoteList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      noteList: []
    };
  };

  componentWillMount() {
    this.notes = [];

    this.firebaseRef = new Firebase("https://simply-notes.firebaseio.com/");
    this.firebaseRef.on("child_added", function(dataSnapshot) {
      this.notes.push({
        'id': dataSnapshot.key(),
        'subject': 'Note',
        'plain_content': dataSnapshot.val().plain_content,
        'raw_content': dataSnapshot.val().content
      });
      this.setState({
        noteList: this.notes
      });
    }.bind(this));
  }

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

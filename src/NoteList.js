import React, { Component } from 'react';
import NoteListPoint from './NoteListPoint';

export default class NoteList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      noteList: []
    };
  };

  api_update_note_list(notes, dataSnapshot){
    notes.push({
      'id': dataSnapshot.key,
      'subject': dataSnapshot.val().subject,
      'plain_content': dataSnapshot.val().plain_content,
      'raw_content': dataSnapshot.val().content,
      'tags': dataSnapshot.val().tags
    });
  }

  componentWillMount() {
    var notes = [];
    console.log(this.props.currentUser);
    this.props.firebaseApp.database().ref('notes/' + this.props.currentUser + "/").on("child_added", function(dataSnapshot) {
      this.api_update_note_list(notes, dataSnapshot);
      console.log(notes);
      this.setState({
        noteList: notes
      });

    }.bind(this));

    this.props.firebaseApp.database().ref('notes/' + this.props.currentUser + "/").on('child_removed', function(data) {
      let key = data.key;

      //TODO: Should be refactored, works, but it's not that nice
      this.state.noteList.forEach(function(value, idx){
        if(value.id == key){
          this.state.noteList.splice(idx, 1);
        }
      }.bind(this));

    }.bind(this));

    this.props.firebaseApp.database().ref('notes/' + this.props.currentUser + "/").on('child_changed', function(data) {
      let key = data.key;
      let copy_state = this.state.noteList;

      //TODO: Should be refactored
      copy_state.forEach(function(value, idx){
        if(value.id == key){
          value.subject = data.val().subject,
          value.plain_content = data.val().plain_content,
          value.raw_content = data.val().content
        }
      }.bind(this));

      this.setState({
        'noteList': copy_state
      })

    }.bind(this));
  }


  switchEditorNote(subject, content, key, tags){
    this.props.changeSubject(subject);
    this.props.changeEditorContent(content);
    this.props.changeNoteId(key);
    this.props.changeTags(tags,false);
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

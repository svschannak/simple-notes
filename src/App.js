import React, { Component } from 'react'
import ReactDOM  from 'react-dom'
import MediumEditor from './MediumDraft'
import SubjectComponent from './SubjectComponent'
import NoteList from './NoteList'
import './App.css'
import logo  from './logo.svg'

export default class App extends Component {
  constructor(){
    super();

    this.default_state = {
      app_name: "Simple Notes",
      current_subject: '',
      current_content: null,
      current_key: ''
    }

    this.state = this.default_state

    this.firebaseRef = new Firebase("https://simply-notes.firebaseio.com/");
  };

  new_note() {
    this.setState(this.default_state)
  }

  api_create_new_note(editor_data, plain_text){
    var result = this.firebaseRef.push({
      subject: this.state.current_subject,
      content: editor_data,
      plain_content: plain_text
    });

    this.setState({
      'current_key': result.key()
    });
  };

  api_update_current_note(new_data){
    let firebase = new Firebase("https://simply-notes.firebaseio.com/" + this.state.current_key);
    firebase.update(new_data);
  }

  api_update_subject(subject){
    this.api_update_current_note({
      subject: this.state.current_subject
    });
  }

  api_update_note(editor_data, plain_text){
    this.api_update_current_note({
      content: editor_data,
      plain_content: plain_text
    });
  };

  change_current_subject(new_subject){
    this.setState({
      current_subject: new_subject
    });
    document.title = new_subject;
  };

  edit_current_subject(subject){
    this.change_current_subject(subject);
    if(this.state.current_key==''){
      this.api_create_new_note(null, null);
      console.log('new note');
    }else{
      this.api_update_subject();
      console.log('update note');
    }
  };

  change_editor_content(content){
    if(content){
      this.setState({
        current_content: JSON.parse(content)
      });
    }
  };

  save_new_content(editor_data, plain_text){
    if(this.state.current_key==''){
      this.api_create_new_note(editor_data, plain_text);
    }else{
      this.api_update_note(editor_data, plain_text);
    }
  }

  update_content(note_id, editor_data){

      this.firebaseRef.push({
        text: editor_data
      });
  }

  change_current_id(note_id){
    console.log(note_id);
    this.setState({
      current_key: note_id
    })
  }

  render () {
    return (
      <div className="row">
        <div className="col-md-2">
          <div className="App-name">{this.state.app_name}</div>
          <NoteList changeSubject={this.change_current_subject.bind(this)} changeEditorContent={this.change_editor_content.bind(this)} changeNoteId={this.change_current_id.bind(this)} />
        </div>
        <div className="col-md-8">
          <SubjectComponent subject={this.state.current_subject} changeSubject={this.change_current_subject.bind(this)} editSubject={this.edit_current_subject.bind(this)} />
          <MediumEditor current_content={this.state.current_content} save_new_content={this.save_new_content.bind(this)} />
        </div>
        <div className="col-md-2 option-sidebar">
          <button className="btn" onClick={this.new_note.bind(this)}>New Note</button>
          <br/>
          <br/>
          <input className="form-control" type="text" placeholder="Tags..." />
        </div>
      </div>
    )
  }
}

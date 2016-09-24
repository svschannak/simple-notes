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

    this.state = {
      app_name: "Simple Notes",
      current_subject: "Testsubject",
      current_content: {"entityMap":{},"blocks":[{"key":"95g31","text":"ffdff","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}
    }

    this.firebaseRef = new Firebase("https://simply-notes.firebaseio.com/");
  };

  change_current_subject(new_subject){
    this.setState({
      current_subject: new_subject
    });
  };

  change_editor_content(content){
    console.log(content);
    this.setState({
      current_content: content
    });
  };

  save_new_content(editor_data, plain_text){
    this.firebaseRef.push({
      content: editor_data,
      plain_content: plain_text
    });
  }

  update_content(note_id, editor_data){

      this.firebaseRef.push({
        text: editor_data
      });
  }

  render () {
    return (
      <div className="row">
      <div className="col-md-2">
      <div className="App-name">{this.state.app_name}</div>
        <NoteList changeSubject={this.change_current_subject.bind(this)} changeEditorContent={this.change_editor_content.bind(this)} />
      </div>
      <div className="col-md-10">
        <SubjectComponent subject={this.state.current_subject} changeSubject={this.change_current_subject.bind(this)} />
        <MediumEditor current_content={this.state.current_content} save_new_content={this.save_new_content.bind(this)} />
      </div>
      </div>
    )
  }
}

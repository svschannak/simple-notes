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
      current_subject: "Testsubject",
      current_text: "Testtext"
    }
  };

  change_current_subject(new_subject){
    this.setState({
      current_subject: new_subject
    });
  };

  change_editor_content(content){
    this.setState({
      current_text: content
    });
  };

  render () {
    return (
      <div className="row">
      <div className="col-md-3">
        <NoteList changeSubject={this.change_current_subject.bind(this)} changeEditorContent={this.change_editor_content.bind(this)} />
      </div>
      <div className="col-md-9">
        <SubjectComponent subject={this.state.current_subject} changeSubject={this.change_current_subject.bind(this)} />
        <MediumEditor current_text={this.state.current_text} />
      </div>
      </div>
    )
  }
}

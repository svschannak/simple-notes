import React, { Component } from 'react'
import ReactDOM  from 'react-dom'
import MediumEditor from './MediumDraft'
import SubjectComponent from './SubjectComponent'
import NoteList from './NoteList'
import TagComponent from './TagComponent'
import './App.css'
import logo  from './logo.svg'

export default class MainEditor extends Component {
  constructor(){
    super();

    this.default_state = {
      app_name: "Simple Notes",
      current_subject: '',
      current_content: null,
      current_key: '',
      current_tags: ''
    }

    this.state = this.default_state
  };

  new_note() {
    this.setState(this.default_state);
  }

  remove_note() {
    this.setState(this.default_state);
    this.api_remove_note();
  }

  api_create_new_note(editor_data, plain_text, subject){
    if(!subject){
      subject = this.state.current_subject
    }
    var result = this.props.firebaseApp.database().ref('notes/' + this.props.currentUser + "/").push({
      subject: subject,
      content: editor_data,
      plain_content: plain_text,
      tags: this.state.current_tags
    });

    this.setState({
      'current_key': result.key
    });
  };

  api_update_current_note(new_data){
    //let firebase = new Firebase("https://simply-notes.firebaseio.com/" + this.state.current_key);
    this.props.firebaseApp.database().ref('notes/' + this.props.currentUser + "/" + this.state.current_key).update(new_data);
  }

  api_update_subject(subject){
    if(!subject){
      subject = this.state.current_subject
    }
    this.api_update_current_note({
      subject: subject
    });
  }

  api_update_tags(subject){
    this.api_update_current_note({
      tags: this.state.current_tags
    });
  }

  api_update_note(editor_data, plain_text){
    this.api_update_current_note({
      content: editor_data,
      plain_content: plain_text
    });
  };

  api_remove_note(){
    this.props.firebaseApp.database().ref('notes/' + this.props.currentUser + "/" + this.state.current_key).remove();
  }

  change_current_subject(new_subject){
    this.setState({
      current_subject: new_subject
    });
    document.title = new_subject;
  };

  edit_current_subject(subject){
    // TODO: Refactor this with callbacks for setState
    this.change_current_subject(subject);

    if(this.state.current_key==''){
      this.api_create_new_note(null, null, subject);
      console.log('new note');
    }else{
      this.api_update_subject(subject);
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

      this.props.firebaseApp.push({
        text: editor_data
      });
  }

  change_current_id(note_id){
    console.log(note_id);
    this.setState({
      current_key: note_id
    })
  }

  edit_tags(tags, save=true){
    this.setState({
      current_tags: tags
    }, function(){
      if(save){
        this.api_update_tags(tags);
      }

    });
  }

  handleLogout(e){
    this.props.firebaseApp.auth().signOut();
  };

  render () {
    return (
      <div className="row">
        <div className="col-md-2">
          <div className="App-name">{this.state.app_name}</div>
          <NoteList firebaseApp={this.props.firebaseApp} currentUser={this.props.currentUser} changeSubject={this.change_current_subject.bind(this)} changeTags={this.edit_tags.bind(this)} changeEditorContent={this.change_editor_content.bind(this)} changeNoteId={this.change_current_id.bind(this)} />
        </div>
        <div className="col-md-8">
          <SubjectComponent subject={this.state.current_subject} changeSubject={this.change_current_subject.bind(this)} editSubject={this.edit_current_subject.bind(this)} />
          <MediumEditor current_content={this.state.current_content} save_new_content={this.save_new_content.bind(this)} />
        </div>
        <div className="col-md-2 option-sidebar">
          <button className="btn" onClick={this.new_note.bind(this)}>New Note</button>
          <button className="btn" onClick={this.remove_note.bind(this)}>Remove Note</button>
          <br/>
          <br/>
          <TagComponent tags={this.state.current_tags} editTags={this.edit_tags.bind(this)} />
          <br/>
          <br/>
          <button className="btn" onClick={this.handleLogout.bind(this)}>Logout</button>
        </div>
      </div>
    )
  }
}

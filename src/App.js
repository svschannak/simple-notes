import React, { Component } from 'react'
import ReactDOM  from 'react-dom'
import MediumEditor from './MediumDraft'
import SubjectComponent from './SubjectComponent'
import NoteList from './NoteList'
import './App.css'
import logo  from './logo.svg'

export default class App extends Component {
  render () {
    return (
      <div className="row">
      <div className="col-md-3">
        <NoteList />
      </div>
      <div className="col-md-9">
        <SubjectComponent />
        <MediumEditor />
      </div>
      </div>
    )
  }
}

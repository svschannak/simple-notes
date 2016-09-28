import React, { Component } from 'react';

export default class SubjectComponent extends Component {
  constructor(){
    super();
  };

  handleChange(event){
    console.log(event.target.value);
    this.props.editSubject(event.target.value);
  };

  render() {

    var styleMap = {
      'padding': '15px 30px',
      'border': '2px solid black',
      'fontSize': '1.6em',
      'marginBottom': '10px',
      'marginTop': '10px',
      'width': "100%",
      'fontFamily': "'Scope One', serif"
    }
    return (
      <input type="text" style={styleMap} placeholder="New Note" value={this.props.subject} onChange={this.handleChange.bind(this)} />
    );
  }
}

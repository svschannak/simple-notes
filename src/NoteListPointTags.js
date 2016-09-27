import React, { Component } from 'react';

export default class NoteListPointTags extends Component {
  render() {
    var tag_list = this.props.tags.split(',');
    console.log(tag_list.length)
    if(tag_list.length > 0){
      return (
          <p>
          {tag_list.map(function(tag){
            return <span className="tag">{tag}</span>;
          }, this)}
          </p>
      );
    }else{
      return (
        <div></div>
      )
    }
  }
}

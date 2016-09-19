/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  KeyBindingUtil,
  Modifier,
} from 'draft-js';

import 'draft-js/dist/Draft.css';
import 'medium-draft/dist/medium-draft.css'

import {
  Editor,
  StringToTypeMap,
  Block,
  keyBindingFn,
  createEditorState,
  addNewBlockAt,
  beforeInput,
  getCurrentBlock,
} from 'medium-draft';


const newTypeMap = StringToTypeMap;
newTypeMap['2.'] = Block.OL;

const { hasCommandModifier } = KeyBindingUtil;

/*
A demo for example editor. (Feature not built into medium-draft as too specific.)
Convert quotes to curly quotes.
*/
const DQUOTE_START = '“';
const DQUOTE_END = '”';
const SQUOTE_START = '‘';
const SQUOTE_END = '’';

const handleBeforeInput = (editorState, str, onChange) => {
  if (str === '"' || str === '\'') {
    const currentBlock = getCurrentBlock(editorState);
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const text = currentBlock.getText();
    const len = text.length;
    if (selectionState.getAnchorOffset() === 0) {
      onChange(EditorState.push(editorState, Modifier.insertText(contentState, selectionState, (str === '"' ? DQUOTE_START : SQUOTE_START)), 'transpose-characters'));
      return true;
    } else if (len > 0) {
      const lastChar = text[len - 1];
      if (lastChar !== ' ') {
        onChange(EditorState.push(editorState, Modifier.insertText(contentState, selectionState, (str === '"' ? DQUOTE_END : SQUOTE_END)), 'transpose-characters'));
      } else {
        onChange(EditorState.push(editorState, Modifier.insertText(contentState, selectionState, (str === '"' ? DQUOTE_START : SQUOTE_START)), 'transpose-characters'));
      }
      return true;
    }
  }
  return beforeInput(editorState, str, onChange, newTypeMap);
};


export default class MediumEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: createEditorState(),
      editorEnabled: true,
      placeholder: 'Write your story...',
    };

    this.onChange = (editorState, callback = null) => {
      if (this.state.editorEnabled) {
        this.setState({ editorState }, () => {
          if (callback) {
            callback();
          }
        });
      }
    };

    this.logData = this.logData.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    //this.fetchData = this.fetchData.bind(this);
    this.loadSavedData = this.loadSavedData.bind(this);
    this.keyBinding = this.keyBinding.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleDroppedFiles = this.handleDroppedFiles.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
  }

  componentDidMount() {
    //setTimeout(this.fetchData, 1000);
  }

  keyBinding(e) {
    if (hasCommandModifier(e)) {
      if (e.which === 83) {  /* Key S */
        return 'editor-save';
      } else if (e.which === 74 /* Key J */) {
        return 'do-nothing';
      }
    }
    if (e.altKey === true) {
      if (e.shiftKey === true) {
        switch (e.which) {
          /* Alt + Shift + L */
          case 76: return 'load-saved-data';
          /* Key E */
          // case 69: return 'toggle-edit-mode';
        }
      }
      if (e.which === 72 /* Key H */) {
        return 'toggleinline:HIGHLIGHT';
      }
    }
    return keyBindingFn(e);
  }

  handleKeyCommand(command) {
    if (command === 'editor-save') {
      window.localStorage['editor'] = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
      return true;
    } else if (command === 'load-saved-data') {
      this.loadSavedData();
      return true;
    } else if (command === 'toggle-edit-mode') {
      this.toggleEdit();
    }
    return false;
  }

  fetchData() {
    const req = new XMLHttpRequest();
    req.open('GET', 'data.json', true);
    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        const data = JSON.parse(req.responseText);
        this.setState({
          editorState: createEditorState(data),
          placeholder: 'Write your story...'
        }, () => {
          this.refs.editor.focus();
        });
      }
    };
    req.send();
  }

  logData(e) {
    window.es = this.state.editorState;
    console.log(convertToRaw(this.state.editorState.getCurrentContent()));
    console.log(this.state.editorState.getSelection().toJS());
  }

  loadSavedData() {
    const data = window.localStorage.getItem('editor');
    if (data === null) {
      return;
    }
    try {
      const blockData = JSON.parse(data);
      console.log(blockData);
      this.onChange( EditorState.push(this.state.editorState, convertFromRaw(blockData)), this.refs.editor.focus);
    } catch(e) {
      console.log(e);
    }
  }

  toggleEdit(e) {
    this.setState({
      editorEnabled: !this.state.editorEnabled
    }, () => {
      //
    });
  }

  handleDroppedFiles(selection, files) {
    const file = files[0];
    if (file.type.indexOf('image/') === 0) {
      // eslint-disable-next-line no-undef
      const src = URL.createObjectURL(file);
      this.onChange(addNewBlockAt(
        this.state.editorState,
        selection.getAnchorKey(),
        Block.IMAGE, {
          src,
        }
      ));
    }
  }

  handleReturn(e) {
    // const currentBlock = getCurrentBlock(this.state.editorState);
    // var text = currentBlock.getText();
    return false;
  }

  render() {
    const { editorState, editorEnabled } = this.state;
    return (
      <div>
        <Editor
          ref="editor"
          editorState={editorState}
          onChange={this.onChange}
          editorEnabled={editorEnabled}
          handleDroppedFiles={this.handleDroppedFiles}
          handleKeyCommand={this.handleKeyCommand}
          placeholder={this.state.placeholder}
          keyBindingFn={this.keyBinding}
          beforeInput={handleBeforeInput}
          handleReturn={this.handleReturn}
        />
      </div>
    );
  }
};

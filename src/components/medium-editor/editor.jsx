import React from 'react';
import {
  ImageSideButton,
  Editor,
  createEditorState,
  getCurrentContent,
  convertToRaw,
} from 'medium-draft';
import 'medium-draft/lib/index.css';




export default class MediumEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: createEditorState() // for empty content
    };

    this.onChange = (editorState) => {
      this.setState({ editorState });
    };
  }

  componentDidMount() {
    this.refs.editor.focus();
  }

  render() {
    const { editorState, sideButtons } = this.state;
    return (
      <Editor
        className="hide"
        ref="editor"
        editorState={this.props.editorState}
        onChange={this.props.updateEditorState}
      />
    );
  }
};

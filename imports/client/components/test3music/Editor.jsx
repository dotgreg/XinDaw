import React from 'react';
import CodeMirror from 'react-codemirror';

import { Meteor } from 'meteor/meteor'

require('codemirror/lib/codemirror.css');

export default class Editor extends React.Component {

  constructor(props){
    super(props)
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.sound) return false

    const codeMirror = this.refs['editor'].getCodeMirrorInstance();

    this.refs.editor.getCodeMirror().setValue(this.props.sound.code);

    let options = {
      hint: codeMirror.hint.javascript,
      disableKeywords: true,
      completeSingle: false,
      completeOnSingleClick: false
    }
  }

	saveCode = () => Meteor.call('sounds.updateCode', this.props.sound._id, this.refs.editor.getCodeMirror().getValue())
	saveName = () => Meteor.call('sounds.updateName', this.props.sound._id, this.refs.name.value)
	save = () => {
    this.saveCode()
    // this.saveTitle()
  }

	render() {
    if (!this.props.sound) return false

		var options = {
			lineNumbers: true,
		};

		return (
      <div className="editorWrapper">
        <input
          type="text"
          ref="name"
          onChange={this.saveName}
          defaultValue={this.props.sound.name} />
        <CodeMirror
          ref="editor"
          value={this.props.sound.code}
          options={options} />
        <button onClick={this.save}> Save Code</button>
      </div>
    )
  }
}

// React.render(<App />, document.getElementById('app'));

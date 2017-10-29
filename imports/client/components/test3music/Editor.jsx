import React from 'react';
import CodeMirror from 'react-codemirror';

require('codemirror/lib/codemirror.css');

export default class Editor extends React.Component {

  constructor(props){
    super(props)
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.sound) return false

    const codeMirror = this.refs['editor'].getCodeMirrorInstance();
    // const MyCodeMirror = this.refs['editor'].getCodeMirror();

    this.refs.editor.getCodeMirror().setValue(this.props.sound.code);

    let options = {
      hint: codeMirror.hint.javascript,
      disableKeywords: true,
      completeSingle: false,
      completeOnSingleClick: false
    }
  }

	saveCode = newCode => this.props.onSaveCode(this.refs.editor.getCodeMirror().getValue())

	render() {
    if (!this.props.sound) return false

		var options = {
			lineNumbers: true,
		};

		return (
      <div className="editorWrapper">
        <h1>{this.props.sound.name}</h1>
        <CodeMirror
          ref="editor"
          value={this.props.sound.code}
          options={options} />
        <button onClick={this.saveCode}> Save </button>
      </div>
    )
  }
}

// React.render(<App />, document.getElementById('app'));

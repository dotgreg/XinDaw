import React from 'react';
import CodeMirror from 'react-codemirror';

require('codemirror/lib/codemirror.css');

export default class Editor extends React.Component {

  constructor(props){
    super(props)
    // this.state = {
    //   code: "// Code",
    //   old: false,
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.sound) return false

    console.log(nextProps)

    const codeMirror = this.refs['editor'].getCodeMirrorInstance();
    const MyCodeMirror = this.refs['editor'].getCodeMirror();

    let options = {
      hint: codeMirror.hint.javascript,
      disableKeywords: true,
      completeSingle: false,
      completeOnSingleClick: false
    }
  }

	saveSoundCode = newCode => this.props.onSaveCode(newCode)

	render() {
    if (!this.props.sound) return false

		var options = {
			lineNumbers: true,
		};

		return (
      <div className="editorWrapper">
        <CodeMirror
          ref="editor"
          value={this.props.sound.code}
          options={options} />
        <button onClick={this.saveSoundCode}> Save </button>
      </div>
    )
  }
}

// React.render(<App />, document.getElementById('app'));

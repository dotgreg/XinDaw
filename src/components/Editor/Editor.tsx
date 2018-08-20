import * as React from 'react';
import CodeMirror from 'react-codemirror';

// import * as css from '/imports/client/components/css/styles.js'

// import './editor.css');
// require('./editor.sass');

require('codemirror/lib/codemirror.css');
require('codemirror/theme/monokai.css');
// require('codemirror/keymap/sublime.js');
require('codemirror/mode/javascript/javascript.js');
// import 'codemirror/lib/codemirror.css'
// import 'codemirror/theme/monokai.css'
// import 'codemirror/keymap/sublime.js'
// import 'codemirror/mode/javascript/javascript.js'

interface Props {
  code: string
}
interface State {
  // sound: any
}

export default class Editor extends React.Component<Props, State> {

  constructor(props){
    super(props)
  }

  componentDidUpdate(prevProps, prevState) {

    // console.log(this.refs['editor'])

    // const codeMirror = this.refs['editor'].getCodeMirrorInstance();

    // this.refs.editor.getCodeMirror().setValue(this.props.sound.code);
  }

	// saveCode = () => Meteor.call('sounds.updateCode', this.props.sound._id, this.refs.editor.getCodeMirror().getValue())
	// saveName = () => Meteor.call('sounds.updateName', this.props.sound._id, this.refs.name.value)
	// saveTags = () => Meteor.call('sounds.updateTags', this.props.sound._id, this.refs.tags.value)
	save = () => {
    // this.saveCode()
    // this.saveTitle()
  }

	render() {
    let options = {
      // keyMap: "sublime",
      mode: "javascript",
      theme: "monokai",
      disableKeywords: true,
      completeSingle: false,
      lineNumbers: true,
      extraKeys: {
        "Ctrl-S": () => {
          // this.saveCode()
        }
      },
      completeOnSingleClick: false
    }

		return (
      <div className="component-editor">
        <CodeMirror
          ref="editor"
          value={this.props.code}
          options={options} />
      </div>
    )
  }
}

// React.render(<App />, document.getElementById('app'));

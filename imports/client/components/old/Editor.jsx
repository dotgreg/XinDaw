import React from 'react';
import CodeMirror from 'react-codemirror';
import Tone from 'tone';

require('codemirror/lib/codemirror.css');

require('codemirror/addon/hint/show-hint.js');
require('codemirror/addon/hint/show-hint.css');

require('codemirror/addon/hint/javascript-hint.js');
require('codemirror/addon/hint/anyword-hint.js');

export default class Editor extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      code: "// Code",
      old: false,
    }
    this.updateCode = this.updateCode.bind(this)
  }

  componentDidMount () {
    const codeMirror = this.refs['editor'].getCodeMirrorInstance();
    const MyCodeMirror = this.refs['editor'].getCodeMirror();
    // console.log(codeMirror.hint.javascript)

    // setInter

    let options = {
      hint: codeMirror.hint.javascript,
      disableKeywords: true,
      completeSingle: false,
      completeOnSingleClick: false
    }

    MyCodeMirror.on("update", function (cm) {
      // console.log(cm)
      if (!cm.state.completionActive) {
      // cm.showHint(options);
      //        /*Enter - do not open autocomplete list just after item has been selected in it*/
      //
      }
    }.bind(this))


    // TONE
    Tone.Transport.bpm.value = 120
    Tone.Transport.loopEnd = '4m'
    Tone.Transport.loop = true
    Tone.Transport.start('+0.1')
    window.Tone = Tone


    setInterval(() => {
      if (this.state.code === this.state.old) return

      console.log('code changed')
      // Tone.Transport.cancel()
      Tone.Transport.stop()


      setTimeout(() => {
        console.log('code changed, starting again')
        Tone.Transport.start('+0.1')
        eval(this.state.code)
        this.setState({ old: this.state.code});
      }, 2000)
    }, 2000)

  }

	updateCode(newCode) {
    // console.log(newCode)
    // console.log(this.refs.editor)
		this.setState({
			code: newCode,
		});

    // eval(newCode  )
	}

	render() {

		var options = {
			lineNumbers: true,
		};
		return (
      <CodeMirror
        ref="editor"
        value={this.state.code}
        onChange={this.updateCode}
        options={options} />
    )
  }

}

// React.render(<App />, document.getElementById('app'));

import * as React from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import config from '../../config';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/monokai.css');
require('codemirror/mode/javascript/javascript.js');

interface Props {
  code: string
  onSave: Function
}

export default class CodeEditor extends React.Component<Props, {}> {
  code:string
  updateCode = (newCode:string) => {
    this.code = newCode
  }

	render() {
    config.debug.codeEditor && console.log('[CODEEDITOR] Render with code : ', this.props.code)

    this.code = this.props.code

    let options = {
      // keyMap: "sublime",
      mode: "javascript",
      theme: "monokai",
      disableKeywords: true,
      completeSingle: false,
      lineNumbers: true,
      extraKeys: {
        "Ctrl-S": () => {
          this.props.onSave(this.code)
        }
      },
      completeOnSingleClick: false
    }

		return (
      <div className="component-editor">
        <CodeMirror
          value={this.props.code}
          onChange={(editor, data, value) => {
            this.updateCode(value)
          }}
          options={options} />
      </div>
    )
  }
}
import * as React from 'react';

interface Props {
  label?: string
  onChange?: Function
  initVal?: boolean
}

class Checkbox extends React.Component<Props, {}> {
  
  constructor(props) {
    super(props)
  }

  public render() {
    return (
        <div>
            <label>
                <input 
                  type="checkbox" 
                  onChange={(e)=>{this.props.onChange && this.props.onChange(e.target.checked)}}
                  checked={this.props.initVal}
                />
                {this.props.label}
            </label>
        </div>
    );
  } 
}

  
  
export default Checkbox;
  
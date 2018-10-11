import * as React from 'react';
import { Link, navigate } from '@reach/router';

interface Props {
  label?: string
  onChange?: Function
}

class Checkbox extends React.Component<Props, {}> {
  
  constructor(props) {
    super(props)
  }

  public render() {
    return (
        <div>
            <label>
                {this.props.label}
                <input type="checkbox" onChange={(e)=>{this.props.onChange && this.props.onChange(e.target.checked)}}/>
            </label>
        </div>
    );
  } 
}

  
  
export default Checkbox;
  
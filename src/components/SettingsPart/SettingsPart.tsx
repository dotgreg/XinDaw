import * as React from 'react';
import { BlockTitle } from 'src/styles/components';
import styled, { cx } from 'react-emotion';
import s from 'src/styles';

interface Props {
  name?: string
  h?: number 
  w?: number 
}
interface State {
  open: boolean
}

class SettingsPart extends React.Component<Props, State> {
  
  constructor(props) {
    super(props)
    this.state = {
        open: false
    }
  }

  public render() {
    return (
        <Styled h={this.props.h} w={this.props.w}>
            <BlockTitle onClick={()=>{this.setState({open: !this.state.open})}}> {this.props.name} {this.state.open ? '▼' : '►'}</BlockTitle>
            <div className={cx('config-panel',s.states.show(this.state.open))}>
                {this.props.children}
            </div>
        </Styled>
    );
  } 
}

const Styled = styled('div')`
    .config-panel {
        height: ${(props:any) => props.h ? props.h : 50}vh;
        width: ${(props:any) => props.w ? props.w : 50}vw;
        overflow-y: scroll;
        padding: 20px;
        margin: 40px;
        border: 1px solid rgba(255,255,255,0.3);
        .config-option {
            margin-bottom: 10px;
            margin-left: 40px;
            label {
                width: 300px;
                display: inline-block;
            }
        }
    }
`

export default SettingsPart;
  
import * as React from 'react';

interface Props {
  name: string
}

export default class Icon extends React.Component<Props, {}> {

  constructor(props){
    super(props)
  }

	render() {
		return (
      <i className={`fa fa-${this.props.name}`} aria-hidden="true"></i>
    )
  }
}

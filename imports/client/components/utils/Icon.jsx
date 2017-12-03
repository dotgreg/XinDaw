import React from 'react';

export default class Icon extends React.Component {

  constructor(props){
    super(props)
  }

	render() {
		return (
      <i className={`fa fa-${this.props.name}`} aria-hidden="true"></i>
    )
  }
}

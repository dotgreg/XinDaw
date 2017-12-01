import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor'
import { Sounds } from '/imports/api/sounds.js';
import React from 'react';
import Sound from '../Sound.jsx';

import * as css from '/imports/client/components/xindaw/css/styles.js'

class FileExplorer extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      searchedTerm: ''
    }
  }


  updateSearchedTerm = e => this.setState({searchedTerm: e.target.value})

	render() {
		return (
      <div>
        <css.FieldWrapper>
          <css.Label>search: </css.Label>
          <css.Input
          type='text'
          value={this.state.searchedTerm}
          onChange={this.updateSearchedTerm} />
        </css.FieldWrapper>
        <ul>
          {this.props.soundsFiltered(new RegExp(this.state.searchedTerm)).map(sound =>
            <Sound key={sound._id} sound={sound} />
          )}
        </ul>
      </div>
    )
  }
}

export default withTracker(props => {
  return {
    sounds: Sounds.find().fetch(),
    soundsFiltered: search => Sounds.find( { $or : [ { name : search }, { tags : search } ] }, { sort: { name: -1 } }).fetch()
    // soundsFiltered: search => Sounds.find({"name": search}, { sort: { name: -1 } }).fetch()
  };
})(FileExplorer);

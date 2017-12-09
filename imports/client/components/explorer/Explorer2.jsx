import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor'
import { Sounds } from '/imports/api/sounds.js';
import React from 'react';
import Sound from '../sound/Sound.jsx';

import SortableTree, { addNodeUnderParent, removeNodeAtPath, getFlatDataFromTree, getTreeFromFlatData } from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';

import styled from 'styled-components';

class FileExplorer2 extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      searchedTerm: '',
      treeData: [{ title: 'Chicken', children: [ { title: 'Egg', otherprop: 'lolcats2' } ], otherprop: 'lolcats' }]
    }

    setTimeout(() => {
      let newTreeData = [ ...this.state.treeData, { title: 'woooopreactivity', children: [ { title: 'Egg', otherprop: 'lolcats2' } ], otherprop: 'lolcats' }]
      this.setState({treeData: newTreeData})
    }, 2000)
  }


  updateSearchedTerm = e => this.setState({searchedTerm: e.target.value})

  updateTreeData = treeData => {

    let flatmap = getFlatDataFromTree({treeData: treeData, getNodeKey: this.getNodeKey, ignoreCollapsed: false})
    flatmap = flatmap.map(({ node, path }) => {
      return {
        id: node.id,
        name: node.name,
        // The last entry in the path is this node's key
        // The second to last entry (accessed here) is the parent node's key
        parent: path.length > 1 ? path[path.length - 2] : null,
      }
    })

    this.setState({ treeData })
  }

  createNode = (node) => {
    return {
      title: `helloworld ${
        node.title.split(' ')[0]
      }sson`,
    }
  }

  generateNodePropsFunc = ({ node, path }) => {
    let buttons = [
      <button onClick={this.addNode.bind(this, node, path)}> + </button>
    ]
    // if (!node.children) buttons.push(<button onClick={this.removeNode.bind(this, node, path)}> - </button>)
    return {buttons: buttons}
  }

 getNodeKey = ({ treeIndex }) => {
    return treeIndex
  };

  // addNode = ({ node, path }) => {
  addNode = (node, path) => {
    // return
    return this.setState(state => ({
      treeData: addNodeUnderParent({
        treeData: state.treeData,
        parentKey: path[path.length - 1],
        expandParent: true,
        getNodeKey: this.getNodeKey,
        newNode: this.createNode(node),
      }).treeData,
    }))
  }

  removeNode = (node, path) => {
    return this.setState(state => ({
      treeData: removeNodeAtPath({
        treeData: state.treeData,
        path: path,
        getNodeKey: this.getNodeKey,
      }),
    }))
  }

	render() {
		return (
      <div>
        <div style={{ height: 400 }}>
          <SortableTree
            treeData={this.state.treeData}
            theme={FileExplorerTheme}
            onChange={this.updateTreeData}
            generateNodeProps={this.generateNodePropsFunc}
          />
        </div>
        Explorer
        <input
          type='text'
          value={this.state.searchedTerm}
          onChange={this.updateSearchedTerm} />
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
    soundsFiltered: search => Sounds.find({"name": search}, { sort: { name: -1 } }).fetch()
  };
})(FileExplorer2);

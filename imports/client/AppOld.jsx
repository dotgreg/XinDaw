import React from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Tasks } from '../api/tasks.js';
import Task from './Task.jsx';

import RouterWrapper from './router/Router.jsx';
import Menu from './components/Menu.jsx';


// App component - represents the whole app
class App extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  renderTasks() {
    return this.props.tasks.map((task) => (
       <Task key={task._id} task={task} />
     ));
  }

  render() {
    return (
      <div className="container">
        <RouterWrapper />
        <Menu />
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
};


export default createContainer(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App)

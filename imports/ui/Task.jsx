import React, {
    Component,
    PropTypes
} from 'react';
import {
    Tasks
} from '../api/tasks.js';
import classnames from 'classnames';
// Task component - represents a single todo item
export default class Task extends Component {
    toggleChecked() {
        // Set the checked property to the opposite of its current value

        //Tasks.update(this.props.task._id, {
        //    $set: {
        //        checked: !this.props.task.checked
        //    },
        //});
        Meteor.call('tasks.setChecked', this.props.task._id, this.props.task.checked)
    }
    togglePrivate(){
        Meteor.call('tasks.setPrivate', this.props.task_id, ! this.props.task.private)
    }
    deleteThisTask() {
        Tasks.remove(this.props.task._id);
        //Meteor.call('tasks.remove', this.props.task._id);
    }
    render() {
        // Give tasks a different className when they are checked off,
        // so that we can style them nicely in CSS
        const taskClassName = this.props.task.checked ? 'checked' : '';
        return (
            <li className={taskClassName}>
                <button className="delete" onClick={this.deleteThisTask.bind(this)}>&times;</button>
                <input type="checkbox" readOnly checked={this.props.task.checked} onClick={this.toggleChecked.bind(this)} />
                {
                    this.props.showPrivateButton ? (
                        <button classname="toggle-private" onClick={this.togglePrivate.bind(this)}>
                            {this.props.task.private ? 'Private' : 'Public'}
                        </button>
                    ) : 
                }
                <span className="text"><strong>{this.props.task.username}</strong>: {this.props.task.text}</span>
            </li>
        );
    }
}
Task.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    task: PropTypes.object.isRequired,
    showPrivateButton: React.PropTypes.bool.required,
};

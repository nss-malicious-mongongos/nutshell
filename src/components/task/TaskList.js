import React, { Component } from 'react';
import TaskManager from "../../modules/TaskManager";

import "./tasks.css";
export default class TaskList extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            boxIsChecked: false
        };
    
        this.checkboxToggle = this.checkboxToggle.bind(this);
    }
    
    checkboxToggle = event => {
        // state is updated first
        this.setState({ boxIsChecked: !this.state.boxIsChecked });
        //console.log("boxIsChecked: " + this.state.boxIsChecked);
        if (this.state.boxIsChecked === false) {
            TaskManager.get(event.target.id)
            .then(task => {
                    const taskStatus = {
                        name: task.name,
                        completion_date: task.completion_date,
                        userId: task.userId,
                        completed: true,
                        id: task.id
                    }
                    this.props.updateTask(taskStatus)
                });
        }
    }   

    render() {
        return (
            <div className="overflow-auto" id="tasks-module">
                <h2>Task List</h2>
                <div className="taskButton text-center">
                    <button type="button" className="btn btn-success" onClick={() => {this.props.history.push("/tasks/new")}}>Add New Task</button>
                </div>
                {
                    this.props.tasks.map(task => 
                        <div key={task.id} className="card p-1">
                        <div className="card-header" onClick={() => { this.props.history.push(`/tasks/${task.id}/edit`); }}>{task.name}</div>
                        Due on {task.completion_date}
                        <div className="form-group form-inline">
                            <input type="checkbox" id={task.id} name="completed" value={this.state.boxIsChecked} 
                            onClick={this.checkboxToggle} />
                            &nbsp;
                            <label htmlFor="completed">completed</label>                    
                        </div>
                        <div className="small text-right">by {task.user.username}</div>
                        {/* <button type="button" className="btn btn-danger" onClick={() => this.props.deleteTask(task.id)}>Delete</button> */}
                        </div>
                    )
                }
            </div>
        );
    }
}
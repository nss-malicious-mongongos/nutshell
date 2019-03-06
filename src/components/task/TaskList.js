import React, { Component } from 'react'

export default class TaskList extends Component {
    render() {
        return (
            <div className="overflow-auto" id="tasks-module">
                <h2>Task List</h2>
                <div className="taskButton">
                    <button type="button" className="btn btn-success" onClick={() => {this.props.history.push("/tasks/new")}}>Add New Task</button>
                </div>
                {
                    this.props.tasks.map(task => 
                        <div key={task.id} className="card">
                        <p className="card-header">{task.name}</p>
                        <p>Due on {task.completion_date}</p>
                        <p><input type="checkbox" id="completed" name="completed" value="1" 
                            onClick={() => { /*change state */ }}
                        />
                        <label htmlFor="completed">completed</label>
                        </p>
                        <a href="#" onClick={() => { this.props.history.push(`/tasks/${task.id}/edit`); }}>Edit</a>
                        <a href="#" onClick={() => this.props.delete(task.id)} className="btn-red">Delete</a>
                        </div>
                    )
                }
            </div>
        );
    }
}
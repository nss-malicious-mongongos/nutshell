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
                        <p className="card-header" onClick={() => { this.props.history.push(`/tasks/${task.id}/edit`); }}>{task.name}</p>
                        Due on {task.completion_date}
                        <label htmlFor="completed">completed</label>
                        <input type="checkbox" id="completed" name="completed" value="1" 
                            onClick={() => { /*change state */ }}
                        />
                        <button type="button" className="btn btn-danger" onClick={() => this.props.delete(task.id)}>Delete</button>
                        </div>
                    )
                }
            </div>
        );
    }
}
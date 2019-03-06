import React, { Component } from "react";
import TaskManager from "../../modules/TaskManager";

export default class TaskEditForm extends Component {
    // Set initial state
    state = {
        taskName: "",
        taskDate: ""
    };
    
    // Update state whenever an input field is edited
    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);
    };
    
    updateExistingTask = event => {
        event.preventDefault();
        const editedTask = {
            id: parseInt(this.props.match.params.taskId),
            name: this.state.taskName,
            completion_date: this.state.taskDate,
            userId: parseInt(sessionStorage.getItem("credentials")),
            completed: 0
        };
        this.props.updateTask(editedTask)
            .then(() => this.props.history.push("/"));
    };

    componentDidMount() {
        TaskManager.get(this.props.match.params.taskId)
            .then(task => {
                this.setState({
                    taskName: task.name,
                    taskDate: task.completion_date
                });
        });
    }
    
    render() {
        return (
            <React.Fragment>
                <form className="taskForm">
                    <div className="form-group">
                        <label htmlFor="taskName">Task name</label>
                        <input type="text" required className="form-control" onChange={this.handleFieldChange} id="taskName" value={this.state.taskName} />
                    </div>
                    <button type="submit" onClick={this.updateExistingTask} className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        );
    }
}
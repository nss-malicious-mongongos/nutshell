import React, { Component } from "react";

export default class TaskForm extends Component {
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
    
    createNewTask = event => {
        event.preventDefault();
        const task = {
            name: this.state.taskName,
            completion_date: this.state.taskDate,
            userId: parseInt(sessionStorage.getItem("credentials")),
            completed: false
        };
            
        this.props.addTask(task)
            .then(() => this.props.history.push("/"));
    };
    
    render() {
        return (
            <React.Fragment>
                <form className="taskForm">
                    <div className="form-group">
                        <label htmlFor="taskName">Task name</label>
                            <input type="text" required className="form-control" onChange={this.handleFieldChange} id="taskName" placeholder="what do you need to do?" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="taskDate">Completion Date</label>
                        <input type="date" required className="form-control" onChange={this.handleFieldChange} id="taskDate" />
                    </div>
                    <button type="submit" onClick={this.createNewTask} className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        );
    }
}
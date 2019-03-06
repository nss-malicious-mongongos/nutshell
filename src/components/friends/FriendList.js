import React, { Component } from 'react';

export default class FriendList extends Component {
    render() {
        return (
            <div className="overflow-auto" id="friends-module">
                <h2>Friends List</h2>
                <div className="friendButton text-center">
                    <button type="button" className="btn btn-success" onClick={() => {this.props.history.push("/friends/new")}}>Add New Friend</button>
                </div>
                {
                    this.props.friends.map(friend => 
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
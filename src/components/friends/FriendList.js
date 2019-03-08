import React, { Component } from 'react';

export default class FriendList extends Component {
    render() {
        return (
            <div className="overflow-auto" id="friends-module">
                <h3>Friends List</h3>
                <div className="friendButton text-center">
                    <button type="button" className="btn btn-success" onClick={() => {this.props.history.push("/friends/new")}}>Add New Friend</button>
                    {
                        this.props.friends.map(friend => 
                            <div key={friend.id} className="card p-1">
                                {
                                    this.props.users
                                        .filter(user => user.id === friend.otherPersonId)
                                        .map(u => 
                                            <React.Fragment>
                                                {u.username}
                                                <button type="button" className="btn btn-danger" onClick={() => this.props.deleteFriend(friend.id)}>Delete</button>
                                            </React.Fragment>
                                            )
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}
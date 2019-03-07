import React, { Component } from 'react';

export default class FriendList extends Component {
    render() {
        return (
            <div className="overflow-auto" id="friends-module">
                <h2>Friends List</h2>
                <div className="friendButton text-center">
                    <button type="button" className="btn btn-success" onClick={() => {this.props.history.push("/friends/new")}}>Add New Friend</button>
                    {
                        this.props.friends.map(friend => 
                            <div key={friend.id} className="card p-1">
                                <div className="card-header">{friend.user.username}</div>
                                {
                                    this.props.users
                                        .filter(user => user.id === friend.otherPersonId)
                                        .map(u => 
                                            <div key={u.id}>
                                                is friends with {u.username}&nbsp;
                                                <button type="button" className="btn btn-danger" onClick={() => this.props.deleteFriend(friend.id)}>Delete</button>
                                            </div>
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
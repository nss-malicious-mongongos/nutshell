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
                            <div id={friend.id} className="card p-1">
                                <div className="card-header">{friend.user.username}</div>
                                {
                                    this.props.users
                                        .filter(user => user.id === friend.otherpersonId)
                                        .map(u =>
                                            <div>
                                                is friends with {u.username}
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
import React, { Component } from "react";

export default class NewFriend extends Component {
    state = {
        friendName: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);
    };

    createNewFriend = event => {
        event.preventDefault();

        const friendArray = this.props.users.filter(user => user.username === this.state.friendName)
        if (friendArray.length === 0) {
            window.alert("No such user found!")
        } else {
            const friendId = friendArray[0].id

            const friend = {
                userId: parseInt(sessionStorage.getItem("credentials")),
                otherPersonId: friendId
            };
    
        this.props.addFriend(friend)
            .then(() => this.props.history.push("/"));
        }
    };

    render() {
        return (
            <React.Fragment>
                <form className="friendForm">
                    <div className="form-group">
                        <label htmlFor="friendName">Friend username</label>
                            <input type="text" className="form-control" onChange={this.handleFieldChange} id="friendName" placeholder="type a username" />
                    </div>
                    <button type="submit" onClick={this.createNewFriend} className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        );
    }
}
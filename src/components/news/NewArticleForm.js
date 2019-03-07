import React, { Component } from "react";
import moment from 'moment'


export default class NewArticleForm extends Component {
    state = {
        title: "",
        synopsis: "",
        url: "",
        timestamp: "",
        userId: ""
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    createNewArticle = evt => {
        evt.preventDefault();
        if (this.state.url === "") {
            window.alert("Please add a link for your Article");
        } else {
            const article = {
                title: this.state.title,
                synopsis: this.state.synopsis,
                url: this.state.url,
                userId: parseInt(sessionStorage.getItem("credentials")),
                timestamp: moment().format('LLL')
            };

            this.props.addNewArticle(article)
                .then(() => this.props.history.push("/"));





        }
    };





    render() {
        return (
            <React.Fragment>
                <form className="articleForm">
                    <div className="form-group">
                        <label htmlFor="title">News Article Title</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="title"
                            placeholder="title"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="synopsis">Synopsis</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="synopsis"
                            placeholder="synopsis"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="url">Add Article URL</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="url"
                            placeholder="url"
                        />
                    </div>

                    <button
                        type="submit"
                        onClick={(evt) => { this.createNewArticle(evt); }}
                        className="btn btn-primary"
                    >
                        Submit
          </button>
                </form>
            </React.Fragment>
        );
    }
}
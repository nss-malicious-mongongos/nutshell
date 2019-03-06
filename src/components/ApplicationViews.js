import React, { Component } from "react"
import { Route } from "react-router-dom"
class ApplicationViews extends Component {
  state = {}
  componentDidMount() { }
  render() {
    console.log(this.props.activeUser)
    return <React.Fragment>
      <Route exact path="/" render={props => {
        return <Dashboard {...props}/>
      }}
      />
    </React.Fragment>
  }
}

export default ApplicationViews

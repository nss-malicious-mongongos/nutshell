import React, { Component } from "react"
import { Route } from "react-router-dom"
import Dashboard from "./Dashboard"
class ApplicationViews extends Component {
  
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

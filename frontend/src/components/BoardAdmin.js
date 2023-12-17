import React, { Component } from "react";

import UserService from "../services/user.service";
import { withRouter } from "../common/with-router";
import { Navigate } from "react-router-dom";

class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      content: "",
      message: ""
    };
  }

  componentDidMount() {

    UserService.getAdminAllUsers().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {

        if (error.response.status === 401) {
          this.setState({redirect: "/home"})
        }

        this.setState({
          message:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message ||
              error.toString()
        });
      }
    );
  }

  

  render() {

    // let users = this.state.content.map((user, index) => {
    //     return <li key={index}>Username: {user.username}, Email: {user.email}, Password: {user.password}</li>      
    // })

    if(this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }


    let users = []

    for (let i = 0; i < this.state.content.length; i++) {
        let user = this.state.content[i]
        users.push(<li key={i}>Username: {user.username}, Email: {user.email}, Password: {user.password}</li>)
    }

    return (
      <div className="container text-light">
        <header className="jumbotron">
            <ul>
                {users}
            </ul>
        </header>

        {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
      </div>
    );
  }
}


export default withRouter(BoardAdmin);
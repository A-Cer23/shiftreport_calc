import React, { Component } from "react";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    this.setState({ currentUser: currentUser, userReady: true })
  }

  onLogout() {
    AuthService.logout();
    window.location.reload();
  }

  render() {

    const { currentUser } = this.state;

    return (
      <div className="text-light">
        {(this.state.userReady) ?
        <div>
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
          <p>
            <strong>Token:</strong>{" "}
            {currentUser.accessToken}
          </p>
          <p>
            <strong>Id:</strong>{" "}
            {currentUser.id}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {currentUser.email}
          </p>
          <strong>Authorities:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
          </ul>
      </div>: null}
      
        <div className="text-center pt-5">
            <button type="button" className="btn btn-danger" onClick={this.onLogout}>Logout</button>
        </div>
      </div>

      
    );
  }
}

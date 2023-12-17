import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardAdmin from "./components/BoardAdmin";
import ShiftReportForm from "./components/ShiftReportForm";
import RequireAuth from "./common/RequireAuth";
import NoAuth from "./common/NoAuth";
import RouteUnavailable from "./components/RouteUnavailable";
import ShiftReportsList from "./components/ShiftReportsList";
import { Container } from "react-bootstrap";
import SelectPayPeriodForm from "./components/SelectPayPeriodForm";
import PayPeriodResult from "./components/PayPeriodResult";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {

    document.body.style.backgroundColor = "#212529";

    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    } else {
      this.setState({
        currentUser: undefined,
        showModeratorBoard: false,
        showAdminBoard: false,
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark ">
          <div className="container-fluid">
            <Link to={"/"} className="navbar-brand" style={{"margin-left": 15}}>
              Shift RC
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Moderator Board
                  </Link>
                </li>
              )}

              

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/shiftreports"} className="nav-link">
                    Shiftreports
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username.charAt(0).toUpperCase() + currentUser.username.slice(1)}
                  </Link>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </div>
          
        </nav>
        
        <Container className="mt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<NoAuth> <Login /> </NoAuth>} />
            <Route path="/register" element={<NoAuth> <Register /> </NoAuth>} />
            <Route path="/profile" element={<RequireAuth> <Profile /> </RequireAuth>} />
            <Route path="/admin" element={ <BoardAdmin />} />
            <Route path="/shiftreports" element={<RequireAuth> <ShiftReportsList /> </RequireAuth>} />
            <Route path="/shiftreport/:id" element={<RequireAuth> <ShiftReportForm /> </RequireAuth>} />
            <Route path="/shiftreport" element={<RequireAuth> <ShiftReportForm /> </RequireAuth>} />
            <Route path="/payperiod/select" element={<RequireAuth> <SelectPayPeriodForm /> </RequireAuth>} />
            <Route path="/payperiod/result" element={<RequireAuth> <PayPeriodResult /> </RequireAuth>} />
            <Route path="*" element={<RouteUnavailable />} />
          </Routes>
        </Container>
      </div>
    );
  }
}

export default App;

import { Component } from "react";
import { withRouter } from "../common/with-router";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link, Navigate, useNavigate } from "react-router-dom";


const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  }

class SelectPayPeriodForm extends Component {
    constructor(props) {
        super(props);
        this.onFromDateChange = this.onFromDateChange.bind(this);
        this.onToDateChange = this.onToDateChange.bind(this);
        this.onHourlyWageChange = this.onHourlyWageChange.bind(this);
        this.endDatePastStartDate = this.endDatePastStartDate.bind(this);
        this.handleSelectPayperiod = this.handleSelectPayperiod.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.state = {
            fromDate: "",
            toDate: "",
            hourlyWage: "",
            loading: false,
            message: "",
        }
    }

    onCancelClick(e) {
        e.preventDefault();
        this.props.router.navigate("/shiftreports");
    }

    onCancelMouseEnter(e) {
        e.target.style.cursor = "pointer";
        e.target.style.background = "red";
    }

    onCancelMouseLeave(e) {
        e.target.style.background = "none";
    }

    endDatePastStartDate = value => {
        if (this.state.toDate) {
          const startDateObj = new Date(this.state.toDate);
          const endDateObj = new Date(value);
      
          if (endDateObj < startDateObj) {
            return (
              <div className="alert alert-danger" role="alert">
                End date must be after start date!
              </div>
            );
          };
        };
      };

    onFromDateChange(e) {
        this.setState({
            fromDate: e.target.value
        });
    }

    onToDateChange(e) { 
        this.setState({
            toDate: e.target.value
        });
    }

    onHourlyWageChange(e) {
        this.setState({
            hourlyWage: e.target.value
        });
    }

    handleSelectPayperiod(e) {
        e.preventDefault();
    
        this.setState({
          message: "",
          loading: true
        });
    
        this.form.validateAll();
    
        if (this.checkBtn.context._errors.length === 0) {

          const dataToSend = {
            fromDate: this.state.fromDate,
            toDate: this.state.toDate,
            hourlyWage: this.state.hourlyWage
          };

          this.props.router.navigate("/payperiod/result", {state: {data: dataToSend}});
        
        } else {
            this.setState({
            loading: false
            });
        }
    }
    

    render() {

        return (
          <div className="col-md-12">
            <div className="card card-container">
              <div className="position-absolute top-0 end-0 pe-2 ps-2 pb-1 text-dark" onClick={this.onCancelClick} onMouseEnter={this.onCancelMouseEnter} onMouseLeave={this.onCancelMouseLeave}>x</div>
              
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
              />
    
              <Form
                
                ref={c => {
                  this.form = c;
                }}
              >
                <div className="form-group">
                  <label htmlFor="fromDate">From Date</label>
                  <Input
                    type="date"
                    className="form-control"
                    name="fromDate"
                    value={this.state.fromDate}
                    onChange={this.onFromDateChange}
                    validations={[required]}
                  />
                </div>
  
                <div className="form-group">
                  <label htmlFor="endDate">To Date</label>
                  <Input
                    type="date"
                    className="form-control"
                    name="endDate"
                    value={this.state.toDate}
                    onChange={this.onToDateChange}
                    validations={[required, this.endDatePastStartDate]}
                  />
                </div>
  
                <div className="form-group">
                  <label htmlFor="hourlyWage">Hourly Wage</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="hourlyWage"
                    value={this.state.hourlyWage}
                    onChange={this.onHourlyWageChange}
                    validations={[required]}
                    
                  />
                </div>
  
                {this.state.message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {this.state.message}
                    </div>
                  </div>
                )}
                <CheckButton
                style={{ display: "none" }}
                ref={c => {
                  this.checkBtn = c;
                }}
              />
              </Form>
              <div className="">
                  <button className="btn btn-primary btn-block" disabled={this.state.loading} onClick={this.handleSelectPayperiod}>
                    {this.state.loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Select</span>
                  </button>
                </div>
            </div>
            
          </div>
        );
      }
}

export default withRouter(SelectPayPeriodForm);
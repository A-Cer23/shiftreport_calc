import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import ShiftReportService from "../services/shift_report_service";

import { withRouter } from '../common/with-router';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
}


class ShiftReportForm extends Component {
    constructor(props) {
        super(props);
        this.handleShiftReportCreation = this.handleShiftReportCreation.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.onChangeStartTime = this.onChangeStartTime.bind(this);
        this.onChangeEndTime = this.onChangeEndTime.bind(this);
        this.handleEndDateSameAsStartDate = this.handleEndDateSameAsStartDate.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onCancelMouseEnter = this.onCancelMouseEnter.bind(this);
        this.onCancelMouseLeave = this.onCancelMouseLeave.bind(this);
        this.deleteShiftReport = this.deleteShiftReport.bind(this);
        this.state = {
            start_date: "",
            end_date: "",
            start_time: "",
            end_time: "",
            loading: false,
            message: "",
            isInputEndDateDisabled: false,
            isEditMode: false,
        };
    };

    deleteShiftReport() {
      ShiftReportService.deleteShiftReport(this.props.router.params.id)
        .then(response => {
          this.props.router.navigate("/shiftreports");
          window.location.reload();
        },
        error => {
          this.setState({
              message: (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                  error.message ||
                  error.toString()
          })
      })
    }

    onCancelMouseEnter(e) {
      e.target.style.cursor = "pointer";
      e.target.style.background = "red";
    }

    onCancelMouseLeave(e) {
      e.target.style.background = "none";
    }

    componentDidMount() {
      const shiftReportId = this.props.router.params.id;

      if (shiftReportId){
        ShiftReportService.getShiftReportById(shiftReportId)
          .then(response => {
            this.setState({
              start_date: response.data.startDate,
              end_date: response.data.endDate,
              start_time: response.data.startTime,
              end_time: response.data.endTime,
              isEditMode: true,
            })
          },
          error => {
            this.setState({
                message: (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString()
            })
        })
      }
    }

    endTimePastStartTime = value => {
      if (this.state.start_time) {
        const startTimeObj = new Date(this.state.start_date + "T" + this.state.start_time);
        const endTimeObj = new Date(this.state.end_date + "T" + value);

    
        if ( endTimeObj < startTimeObj) {
          return (
            <div className="alert alert-danger" role="alert">
              End time must be after start time!
            </div>
          );
        };
      };
    };

    endDatePastStartDate = value => {
      if (this.state.start_date) {
        const startDateObj = new Date(this.state.start_date);
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
    
    onChangeStartDate(e) {

        if (this.state.isInputEndDateDisabled) {
            this.setState({
                start_date: e.target.value,
                end_date: e.target.value
            });
        }
        else {
            this.setState({
                start_date: e.target.value
            });
        }
    };

    onChangeEndDate(e) {
        this.setState({
            end_date: e.target.value
        });
    };

    onChangeStartTime(e) {
        this.setState({
            start_time: e.target.value
        });
    };

    onChangeEndTime(e) {
        this.setState({
            end_time: e.target.value
        });
    };

    handleShiftReportCreation(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {

          const requests = [ShiftReportService.createShiftReport, 
            ShiftReportService.updateShiftReport];

          let index = 0;
    
          if (this.state.isEditMode) {
            index = 1;
          }
    
          requests[index](
              this.state.start_date,
              this.state.end_date,
              this.state.start_time,
              this.state.end_time, 
              this.props.router.params.id,
            ).then(
                () => {
                    this.props.router.navigate("/shiftreports");
                    window.location.reload();
                },
                error => {
                    const resMessage = (
                        error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        } else {
            this.setState({
                loading: false
            });
        };  

    }

    handleEndDateSameAsStartDate(e) {
        if (e.target.checked) {
            this.setState({
                end_date: this.state.start_date,
                isInputEndDateDisabled: true,
            });
        } else {
            this.setState({
                end_date: "",
                isInputEndDateDisabled: false,
            });
        }
    }

    onCancelClick(e) {
        e.preventDefault();

        this.props.router.navigate("/shiftreports");
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
                <label htmlFor="startDate">Start Date</label>
                <Input
                  type="date"
                  className="form-control"
                  name="startDate"
                  value={this.state.start_date}
                  onChange={this.onChangeStartDate}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <Input
                  type="date"
                  className="form-control"
                  name="endDate"
                  value={this.state.end_date}
                  onChange={this.onChangeEndDate}
                  validations={[required, this.endDatePastStartDate]}
                  disabled={this.state.isInputEndDateDisabled}
                />
              </div>

              <div className="form-check">
                  <input className="form-check-input" type="checkbox" onClick={this.handleEndDateSameAsStartDate}></input>
                  <label className="form-check-label">End date same as start date</label>
              </div>

              <div className="form-group">
                <label htmlFor="startTime">Start Time</label>
                <Input
                  type="time"
                  className="form-control"
                  name="startTime"
                  value={this.state.start_time}
                  onChange={this.onChangeStartTime}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="endTime">End Time</label>
                <Input
                  type="time"
                  className="form-control"
                  name="endTime"
                  value={this.state.end_time}
                  onChange={this.onChangeEndTime}
                  validations={[required, this.endTimePastStartTime]}
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
                <button className="btn btn-primary btn-block" disabled={this.state.loading} onClick={this.handleShiftReportCreation}>
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  {this.state.isEditMode ? <span>Update</span> : <span>Create</span>}
                </button>

                {this.state.isEditMode && <button className="btn btn-danger float-end" onClick={this.deleteShiftReport}>Delete</button>}

              </div>
          </div>
          
        </div>
      );
    }
}

export default withRouter(ShiftReportForm);
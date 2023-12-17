import { Component } from "react";
import { withRouter } from "../common/with-router";
import ShiftReportService from "../services/shift_report_service";


class PayPeriodResult extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalHourlyWage: "",
            fromDate: this.props.router.location.state.data.fromDate,
            hourlyWage: this.props.router.location.state.data.hourlyWage,
            toDate: this.props.router.location.state.data.toDate
        }
    }

    componentDidMount() {
        ShiftReportService.payPeriodRequest(this.state.fromDate, 
            this.state.toDate, 
            this.state.hourlyWage)
            .then(response => {
                console.log(response);
                this.setState({
                    totalHourlyWage: response.data
                })
            })
    }

    render() {
        return (
            <div className="container d-flex justify-content-center">
                <div className="text-light">
                <h1 className="pb-4">Pay Period Result</h1>
                <p>From: {this.state.fromDate}</p>
                <p>To: {this.state.toDate}</p>
                <p>Hourly Wage: ${this.state.hourlyWage}/hr</p>
                <p>Total Hourly Wage: ${this.state.totalHourlyWage}</p>
                </div>
            </div>
            
        )
    }
}

export default withRouter(PayPeriodResult);
import { Component } from "react";
import { withRouter } from "../common/with-router";
import ShiftReportService from "../services/shift_report_service";
import { Table } from "react-bootstrap";


class ShiftReportList extends Component {
    constructor(props) {
        super(props);
        this.onShiftReportClick = this.onShiftReportClick.bind(this);
        this.state = {
            shiftReports: [],
            message: "",
        };
    }

    componentDidMount() {
        ShiftReportService.getShiftReports().then(
            response => {

                this.setState({
                    shiftReports: response.data
                });
            },
            error => {
                this.setState({
                    message: (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString()
                })
            }
        )
    }


    onShiftReportClick(id) {
        this.props.router.navigate("/shiftreport/" + id);
    }


    render() {
        return (
            <div>

                <div className="text-center pb-4">
                    <h1 className="text-light"><u>Shift Reports</u></h1>
                </div>

                <div className="row pb-3">
                    <div className="col">
                        
                        <button type="button" className="btn btn-outline-success btn-sm " onClick={() => this.props.router.navigate("/payperiod/select")}>Select Pay Period</button>
                    </div>

                    <div className="col text-end" >
                        <button type="button" className="btn btn-outline-info btn-sm " onClick={() => this.props.router.navigate("/shiftreport")}>Create Shift Report</button>
                    </div>

                </div>

                <div className="container-sm">
                    <Table hover variant="dark">
                        <thead>
                            <tr>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Total Hours</th>
                            </tr>
                        </thead>
                        
                        <tbody class="p-3">
                            {this.state.shiftReports.map(shiftReport => (
                                <tr key={shiftReport.id} onClick={() => this.onShiftReportClick(shiftReport.id)}>
                                    <td>{shiftReport.startDate}</td>
                                    <td>{shiftReport.endDate}</td>
                                    <td>{shiftReport.startTime}</td>
                                    <td>{shiftReport.endTime}</td>
                                    <td>{shiftReport.totalHours}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                
            </div>
        )
    }
}

export default withRouter(ShiftReportList);
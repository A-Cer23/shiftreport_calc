import axios from "axios";
import authHeader from "./auth-header";

const SHIFT_REPORT_URL = process.env.REACT_APP_API_URL + "shiftreports/";


const createShiftReport = (startDate, endDate, startTime, endTime) => {

    return axios.post(SHIFT_REPORT_URL + "create", { 
        startDate, endDate, startTime, endTime
    }, {
        headers: authHeader()
    });
};

const getShiftReports = () => {

    const config = {
        headers: authHeader()
    }

    return axios.get(SHIFT_REPORT_URL + "get", config)
}

const getShiftReportById = (id) => {

    const config = {
        params: {id: id},
        headers: authHeader()
    }

    return axios.get(SHIFT_REPORT_URL + "getbyid", config);
};

const updateShiftReport = (startDate, endDate, startTime, endTime, id) => {


    const config = {
        params:{id: id},
        headers: authHeader()
    }


    return axios.put(SHIFT_REPORT_URL + "update", {  
        startDate, endDate, startTime, endTime
    }, config);
}

const deleteShiftReport = (id) => {

    const config = {
        params:{id: id},
        headers: authHeader()
    }

    return axios.delete(SHIFT_REPORT_URL + "delete", config);
}

const payPeriodRequest = (fromDate, toDate, wagePerHour) => {

    const config = {
        headers: authHeader(),
        params: {
            fromDate, toDate, wagePerHour
        }
    }

    return axios.get(SHIFT_REPORT_URL + "payperiod", config)
}


const ShiftReportService = {
    createShiftReport,
    getShiftReports,
    getShiftReportById,
    updateShiftReport,
    deleteShiftReport,
    payPeriodRequest
};

export default ShiftReportService;
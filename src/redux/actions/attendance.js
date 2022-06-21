import { attendanceConstants } from '../constants';
import { attendancerService } from '../../services';
import { getObjWithProfileId } from '../../helpers/utils';
import { alertActions } from './alert';

export const attendanceActions = {
    createAttendanceAction,
    checkOutAttendanceAction,
    getAttendanceAction,
    alreadyMarkAttendanceAction,
    searchAttendanceAction,
    createShiftDetailAction,
    getAllShiftAction,
    createShiftWeekDetailAction,
    getShiftDetailsAction
};

function createAttendanceAction(state) {   
    return dispatch => {
        dispatch(request());    
        attendancerService.createAttendance(state)
            .then(
                response => {                     
                    const { data } = response;
                    dispatch(success(data));
                    // if (message && message.length > 0) {
                    //     console.log('Result data >>>>>>',message);
                    // }
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: attendanceConstants.CREATE_ATTENDANCE_REQUEST, } }
    function success(defaultClient) { return { type: attendanceConstants.CREATE_ATTENDANCE_SUCCESS, defaultClient } }
    function failure(error) { return { type: attendanceConstants.CREATE_ATTENDANCE_FAILURE, error } }
}

// Check out
function checkOutAttendanceAction(state) {   
    return dispatch => {
        dispatch(request());    
        attendancerService.checkOutAttendance(state)
            .then(
                response => {                     
                    const { message } = response;
                    dispatch(success(response?.message));
                    if (message && message.length > 0) {
              
                    }
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: attendanceConstants.CHECKOUT_ATTENDANCE_REQUEST, } }
    function success(checkOut) { return { type: attendanceConstants.CHECKOUT_ATTENDANCE_SUCCESS, checkOut } }
    function failure(error) { return { type: attendanceConstants.CHECKOUT_ATTENDANCE_FAILURE, error } }
}

// Get All attendace
function getAttendanceAction(state) {   
    return dispatch => {
        dispatch(request());    
        attendancerService.getAttendanceList(state)
            .then(
                response => {                     
                    const { message,data } = response;
                    dispatch(success(data));
                    if (message && message.length > 0) {                        
                    }
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: attendanceConstants.CREATE_ATTENDANCE_REQUEST, } }
    function success(attendance) { return { type: attendanceConstants.GET_ATTENDANCE_SUCCESS, attendance } }
    function failure(error) { return { type: attendanceConstants.CREATE_ATTENDANCE_FAILURE, error } }
}

// check already mark attendance
function alreadyMarkAttendanceAction(state) {   
    return dispatch => {
        dispatch(request());
        attendancerService.alreadyMarkAttendanceList(state)
            .then(
                response => {                     
                    const { message,data } = response;
                    dispatch(success(data));
                    if (message && message.length > 0) {                        
                    }
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: attendanceConstants.CREATE_ATTENDANCE_REQUEST, } }
    function success(checkAlready) { return { type: attendanceConstants.ALREADY_MARK_ATTENDANCE_SUCCESS, checkAlready } }
    function failure(error) { return { type: attendanceConstants.CREATE_ATTENDANCE_FAILURE, error } }
}

// check search attendance
function searchAttendanceAction(state) {     
    return dispatch => {
        dispatch(request());    
        attendancerService.searchAttendance(state)
            .then(
                response => {                     
                    const { message,data } = response;
                    dispatch(success(data));
                    if (message && message.length > 0) {                        
                    }
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: attendanceConstants.CREATE_ATTENDANCE_REQUEST, } }
    function success(attendance) { return { type: attendanceConstants.SEARCH_ATTENDANCE_SUCCESS, attendance } }
    function failure(error) { return { type: attendanceConstants.CREATE_ATTENDANCE_FAILURE, error } }
}


function createShiftDetailAction(data, cb) {
    return dispatch => {
        dispatch(request());

        data = getObjWithProfileId(data);
        attendancerService.createShift(data)
            .then(
                response => {
                    const { status, message, data } = response;

                    if (status === 1) {
                        dispatch(success(data));
                        dispatch(alertActions.success(message));

                    } else {
                        dispatch(alertActions.error(message));
                    }

                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()));

                }
            );
    };

    function request() { return { type: attendanceConstants.CREATE_SHIFT_DETAILS_REQUEST, } }
    function success(shiftData) { return { type: attendanceConstants.CREATE_SHIFT_DETAILS_SUCCESS, shiftData } }
    function failure(error) { return { type: attendanceConstants.CREATE_SHIFT_DETAILS_FAILURE, error } }
}

function createShiftWeekDetailAction(data, cb) {
    return dispatch => {
        dispatch(request());

        data = getObjWithProfileId(data);
        attendancerService.createShiftWeek(data)
            .then(
                response => {
                    const { status, message, data } = response;

                    if (status === 1) {
                        dispatch(success(data));
                        dispatch(alertActions.success(message));

                    } else {
                        dispatch(alertActions.error(message));
                    }

                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()));

                }
            );
    };

    function request() { return { type: attendanceConstants.CREATE_SHIFT_DETAILS_REQUEST, } }
    function success(shiftWeeks) { return { type: attendanceConstants.CREATE_SHIFT_DETAILS_SUCCESS, shiftWeeks } }
    function failure(error) { return { type: attendanceConstants.CREATE_SHIFT_DETAILS_FAILURE, error } }
}

// Get All attendace
function getAllShiftAction() {   
    return dispatch => {
        dispatch(request());    
        attendancerService.getShiftList()
            .then(
                response => {            
                   
                    const { data } = response;
                    
                    if (data.length > 0) {
                        dispatch(success(data));                 
                    }
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: attendanceConstants.GET_SHIFT_REQUEST, } }
    function success(shifts) { return { type: attendanceConstants.GET_SHIFT_SUCCESS, shifts } }
    function failure(error) { return { type: attendanceConstants.GET_SHIFT_FAILED, error } }
}

function getShiftDetailsAction(data) {   
    return dispatch => {
        dispatch(request());    
        attendancerService.getShiftDetails(data)
            .then(
                response => {            
                   
                    const { data } = response;
                    
                    if (data.length > 0) {
                        dispatch(success(data));                 
                    }
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: attendanceConstants.GET_SHIFT_WEEKS_REQUEST, } }
    function success(shiftWeeks) { return { type: attendanceConstants.GET_SHIFT_WEEKS_SUCCESS, shiftWeeks } }
    function failure(error) { return { type: attendanceConstants.GET_SHIFT_WEEKS_FAILURE, error } }
}
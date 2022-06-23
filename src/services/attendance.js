import { handleResponse } from './handle';
import { authHeader } from '../helpers/auth-header';
import { getCookieOid } from '../helpers/utils';

var API_URL = process.env.REACT_APP_SERVER_BASE_URL;
var prefix = 'hr';

export const attendancerService = {
    createAttendance,
    checkOutAttendance,
    getAttendanceList,
    alreadyMarkAttendanceList,
    searchAttendance,
    createShift,
    getShiftList,
    createShiftWeek,
    getShiftDetails
};

function getHeaders() {
    return {
        'Content-Type': 'application/json',
        'oid': getCookieOid(),
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Credentials': true,
        ...authHeader()
    }
}

function createAttendance(data) {
    console.log('Action data >>>>>>>',data);
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };
    return fetch(`${API_URL}${prefix}/createClockInOut`, requestOptions).then(handleResponse);
}

// Check out service 
function checkOutAttendance(data) {
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };
    return fetch(`${API_URL}${prefix}/updateClockInOut`, requestOptions).then(handleResponse);
}

// Get All Attendance list
function getAttendanceList(data) {
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };
    return fetch(`${API_URL}${prefix}/findAllClockInOut`, requestOptions).then(handleResponse);
}

// check already mark attendance
function alreadyMarkAttendanceList(data) {
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };
    return fetch(`${API_URL}${prefix}/findClockInOutByProfileId`, requestOptions).then(handleResponse);
}   

// check search attendance
function searchAttendance(data) {
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };
    return fetch(`${API_URL}${prefix}/findClockInOutRange`, requestOptions).then(handleResponse);
} 

function createShift(data) {
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };
    return fetch(`${API_URL}${prefix}/createShift`, requestOptions).then(handleResponse);
}

function createShiftWeek(data) {
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };
    return fetch(`${API_URL}${prefix}/createShiftWeeks`, requestOptions).then(handleResponse);
}

function getShiftList() {
    const requestOptions = {
        method: 'POST',
        headers: getHeaders()
    };
    return fetch(`${API_URL}${prefix}/findAllShift`, requestOptions).then(handleResponse);
}

function getShiftDetails(data) {
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };
    return fetch(`${API_URL}${prefix}/findShiftByShiftId`, requestOptions).then(handleResponse);
}
import { getHeaders, handleResponse } from './handle';

var API_URL = process.env.REACT_APP_SERVER_BASE_URL;
var prefix = 'user';

export const userService = {
    // getPermissions,
    // getDefaultClient,
    // createUserProfile,
    createNonCpcgrUserProfile,
    loginNonCpcgrUserProfile,
    getUserProfileId
};

// function getPermissions(data) {
//     const requestOptions = {
//         method: 'POST',
//         headers: getHeaders(),
//         body: JSON.stringify(data)
//     };

//     return fetch(`${API_URL}${prefix}/getUserPermissionByObjectId`, requestOptions).then(handleResponse);
// }

// function getDefaultClient(data) {
//     const requestOptions = {
//         method: 'POST',
//         headers: getHeaders(),
//         body: JSON.stringify(data)
//     };

//     return fetch(`${API_URL}${prefix}/getDefaultClient`, requestOptions).then(handleResponse);
// }

// function createUserProfile(data) {
//     const requestOptions = {
//         method: 'POST',
//         headers: getHeaders(),
//         body: JSON.stringify(data)
//     };

//     return fetch(`${API_URL}${prefix}/createUserProfile`, requestOptions).then(handleResponse);
// }

function createNonCpcgrUserProfile(data) {
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };

    return fetch(`${API_URL}admin/registerNonCpcgrUserProfile`, requestOptions).then(handleResponse);
}

function loginNonCpcgrUserProfile(data) {
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };

    return fetch(`${API_URL}admin/loginNonCpcgrUserProfile`, requestOptions).then(handleResponse);
}

function getUserProfileId(data) {
const requestOptions = {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data)
};

return fetch(`${API_URL}admin/getUserProfileByObjectId`, requestOptions).then(handleResponse);
}
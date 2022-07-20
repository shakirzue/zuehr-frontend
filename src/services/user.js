import { getHeaders, handleResponse } from './handle';

var API_URL = process.env.REACT_APP_SERVER_BASE_URL;
var prefix = 'user';

export const userService = {
    // getPermissions,
    // getDefaultClient,
    // createUserProfile,
    createNonCpcgrUserProfile,
    loginNonCpcgrUserProfile,
    getUserProfileId,
    forgetPasswordUserProfile,
    forgetPassword,
    resetPassword,
    changePassword,
    confirmTokenUserProfile
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

    return fetch(`${API_URL}api/UserProfile/Login`, requestOptions).then(handleResponse);
}

function forgetPasswordUserProfile(data) {
    console.log(data, 450)
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };

    return fetch(`${API_URL}api/UserProfile/ForgetPasswordRequest/` + data.employeeNumber, requestOptions).then(handleResponse);
}

function forgetPassword(data) {
    console.log(data, 450)
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };

    return fetch(`${API_URL}api/UserProfile/ForgetPassword`, requestOptions).then(handleResponse);
}

function resetPassword(data) {
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };

    return fetch(`${API_URL}api/UserProfile/ResetPassword`, requestOptions).then(handleResponse);
}

function changePassword(data) {
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };

    return fetch(`${API_URL}api/UserProfile/ChangePassword`, requestOptions).then(handleResponse);
}

function confirmTokenUserProfile(data) {
    console.log(data, 500)
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };

    return fetch(`${API_URL}api/UserProfile/ForgetPasswordRequestVerification/`+data.token, requestOptions).then(handleResponse);
}

function getUserProfileId(data) {
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };

    return fetch(`${API_URL}admin/getUserProfileByObjectId`, requestOptions).then(handleResponse);
}
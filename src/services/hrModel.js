import { getHeaders, handleResponse } from './handle';

var API_URL = process.env.REACT_APP_SERVER_BASE_URL;
var prefix = 'hr';

export const hrModuleService = {
    getHrAllLookups,
    createPersonalDetails,
    getAllGenders,
    getAllPersonalDetails,
    createCompanyDetails,
    getAllPersonalDetailsByEmployeeID,
    updatePersonalDetails,
    createFamilyInformation,
    getFamilyInfoByProfile,
    getPersonalDetailsByUserProfileID
};

function getHrAllLookups() {
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
    };

    return fetch(`${API_URL}${prefix}/getAllHrLookUps`, requestOptions).then(handleResponse);
}

function createPersonalDetails(data) {
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };

    return fetch(`${API_URL}${prefix}/createPersonalDetails`, requestOptions).then(handleResponse);
}

function createCompanyDetails(data) {
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };

    return fetch(`${API_URL}${prefix}/createCompany`, requestOptions).then(handleResponse);
}

function getAllGenders() {
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
    };

    return fetch(`${API_URL}${prefix}/getGendersList`, requestOptions).then(handleResponse);
}

function getAllPersonalDetails() {
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
    };

    return fetch(`${API_URL}${prefix}/findAllPersonalDetails`, requestOptions).then(handleResponse);
}

function getAllPersonalDetailsByEmployeeID(data) {
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };

    return fetch(`${API_URL}${prefix}/findPersonalDetailsByEmployeeId`, requestOptions).then(handleResponse);
}

function getPersonalDetailsByUserProfileID(data) {
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };

    return fetch(`${API_URL}${prefix}/findPersonalDetailsByUserProfileId`, requestOptions).then(handleResponse);
}

function updatePersonalDetails(data) {
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };

    return fetch(`${API_URL}${prefix}/updatePersonalDetails`, requestOptions).then(handleResponse);
}

function createFamilyInformation(data, isEdit = false) {
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };

    let endpoint = isEdit ? 'updateFamilyInformation' : 'createFamilyInformation';
    return fetch(`${API_URL}${prefix}/${endpoint}`, requestOptions).then(handleResponse);
}

function getFamilyInfoByProfile(data) {
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };

    return fetch(`${API_URL}${prefix}/findFamilyInformationByUserProfileId`, requestOptions).then(handleResponse);
}

import { hrModuleConstants } from '../constants';
//import { attendancerService } from '../../services';
import { hrModuleService } from '../../services/hrModel';
import { alertActions } from './alert';
import { getObjWithProfileId, setLocalStorage } from '../../helpers/utils';

export const hrModuleActions = {
    getHrLookupsAction,
    createPersonalDetailAction,
    getGendersAction,
    getUserPersonalDetailsAction,
    createCompanyDetailAction,
    getProfileByEmployeeIdAction,
    updatePersonalDetailAction,
    createFamilyDetailAction,
    getFamilyInfoByProfileAction,
    getProfileByUserProfileIdAction
};

function getHrLookupsAction() {
    return dispatch => {
        dispatch(request());
        hrModuleService.getHrAllLookups()
            .then(
                response => {
                    const { status, message, ...rest } = response;
                    dispatch(success(rest));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()));

                }
            );
    };

    function request() { return { type: hrModuleConstants.GET_HR_LOOKUPS_REQUEST, } }
    function success(data) { return { type: hrModuleConstants.GET_HR_LOOKUPS_SUCCESS, data } }
    function failure(error) { return { type: hrModuleConstants.GET_HR_LOOKUPS_FAILURE, error } }
}

function createPersonalDetailAction(data, cb) {
    return dispatch => {
        dispatch(request());

        let id = localStorage.getItem('userProfileId')
        Object.assign(data, { 'userProfileId': id })
        hrModuleService.createPersonalDetails(data)
            .then(
                response => {
                    const { status, message, data } = response;

                    if (status === 1) {
                        dispatch(success(data));
                        dispatch(alertActions.success(message));
                        setLocalStorage(JSON.stringify(data.id), 'personalDetailId');
                        if (cb) {
                            cb(data?.id)
                        }
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

    function request() { return { type: hrModuleConstants.CREATE_PERSONAL_DETAILS_REQUEST, } }
    function success(personalData) { return { type: hrModuleConstants.CREATE_PERSONAL_DETAILS_SUCCESS, personalData } }
    function failure(error) { return { type: hrModuleConstants.CREATE_PERSONAL_DETAILS_FAILURE, error } }
}

function getGendersAction() {
    return dispatch => {
        dispatch(request());
        hrModuleService.getAllGenders()
            .then(
                response => {
                    const { data } = response;
                    dispatch(success(data));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()));

                }
            );
    };

    function request() { return { type: hrModuleConstants.GET_GENDERS_LOOKUPS_REQUEST, } }
    function success(genders) { return { type: hrModuleConstants.GET_GENDERS_LOOKUPS_SUCCESS, genders } }
    function failure(error) { return { type: hrModuleConstants.GET_HR_LOOKUPS_FAILURE, error } }
}

function getUserPersonalDetailsAction() {
    return dispatch => {
        dispatch(request());
        hrModuleService.getAllPersonalDetails()
            .then(
                response => {
                    const { message, data } = response;
                    dispatch(success(data));
                    dispatch(alertActions.success(message));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()));

                }
            );
    };

    function request() { return { type: hrModuleConstants.GET_PERSONAL_DETAILS_REQUEST, } }
    function success(profileDetails) { return { type: hrModuleConstants.GET_PERSONAL_DETAILS_SUCCESS, profileDetails } }
    function failure(error) { return { type: hrModuleConstants.GET_PERSONAL_DETAILS_FAILURE, error } }
}

function createCompanyDetailAction(data) {
    return dispatch => {
        dispatch(request());

        let id = localStorage.getItem('userProfileId')
        Object.assign(data, { 'userProfileId': id })

        hrModuleService.createCompanyDetails(data)
            .then(
                response => {
                    const { message, data } = response;
                    dispatch(success(data));
                    dispatch(alertActions.success(message));

                    setTimeout(() => {
                        window.location.href = '/HRM/Employees'
                    }, 2000)
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()));

                }
            );
    };

    function request() { return { type: hrModuleConstants.CREATE_COMPANY_DETAILS_REQUEST, } }
    function success(companyData) { return { type: hrModuleConstants.CREATE_COMPANY_DETAILS_SUCCESS, companyData } }
    function failure(error) { return { type: hrModuleConstants.CREATE_COMPANY_DETAILS_FAILURE, error } }
}

function getProfileByEmployeeIdAction(id, cb) {
    return dispatch => {
        dispatch(request());

        let data = { 'employeeId': id };

        hrModuleService.getAllPersonalDetailsByEmployeeID(data)
            .then(
                response => {
                    const { message, data } = response;
                    dispatch(success(data));
                    dispatch(alertActions.success(message));

                    if (cb) {
                        cb();
                    }
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()));

                }
            );
    };

    function request() { return { type: hrModuleConstants.GET_SINGLE_PERSONAL_DETAILS_REQUEST, } }
    function success(singleProfileDetail) { return { type: hrModuleConstants.GET_SINGLE_PERSONAL_DETAILS_SUCCESS, singleProfileDetail } }
    function failure(error) { return { type: hrModuleConstants.GET_SINGLE_PERSONAL_DETAILS_FAILURE, error } }
}

function getProfileByUserProfileIdAction( cb) {
    return dispatch => {
        dispatch(request());
        let data = { 'userProfileId': localStorage.getItem('userProfileId') };
        hrModuleService.getPersonalDetailsByUserProfileID(data)
            .then(
                response => {
                    const { message, data } = response;
                    console.log(data, 'get profile')
                    if(data){
                        dispatch(success(data));
                        dispatch(alertActions.success(message));
                    
                        setLocalStorage(JSON.stringify(data.id), 'personalDetailId');
                    }
                    else{
                        dispatch(failure(message));
                    }
                    if (cb) {
                        cb();
                    }
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()));

                }
            );
    };

    function request() { return { type: hrModuleConstants.GET_SINGLE_PERSONAL_DETAILS_REQUEST, } }
    function success(singleProfileDetail) { return { type: hrModuleConstants.GET_SINGLE_PERSONAL_DETAILS_SUCCESS, singleProfileDetail } }
    function failure(error) { return { type: hrModuleConstants.GET_SINGLE_PERSONAL_DETAILS_FAILURE, error } }
}

function updatePersonalDetailAction(data, cb) {
    return dispatch => {
        dispatch(request());

        let id = localStorage.getItem('userProfielId')
        Object.assign(data, { 'userProfileId': id })

        hrModuleService.updatePersonalDetails(data)
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

    function request() { return { type: hrModuleConstants.CREATE_PERSONAL_DETAILS_REQUEST, } }
    function success(personalData) { return { type: hrModuleConstants.CREATE_PERSONAL_DETAILS_SUCCESS, personalData } }
    function failure(error) { return { type: hrModuleConstants.CREATE_PERSONAL_DETAILS_FAILURE, error } }
}

function createFamilyDetailAction(data, cb, isEdit = false) {
    return dispatch => {
        dispatch(request());

        data = getObjWithProfileId(data);

        hrModuleService.createFamilyInformation(data, isEdit)
            .then(
                response => {
                    const { status, message, data } = response;

                    if (status === 1) {
                        dispatch(success(data));
                        dispatch(alertActions.success(message));

                        if (cb) {
                            cb();
                        }

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

    function request() { return { type: hrModuleConstants.CREATE_FAMILY_DETAILS_REQUEST, } }
    function success(personalData) { return { type: hrModuleConstants.CREATE_FAMILY_DETAILS_SUCCESS, personalData } }
    function failure(error) { return { type: hrModuleConstants.CREATE_FAMILY_DETAILS_FAILURE, error } }
}

function getFamilyInfoByProfileAction(data) {
    return dispatch => {
        dispatch(request());
        hrModuleService.getFamilyInfoByProfile(data)
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

    function request() { return { type: hrModuleConstants.CREATE_FAMILY_DETAILS_REQUEST, } }
    function success(data) { return { type: hrModuleConstants.GET_FAMILY_DETAILS_SUCCESS, data } }
    function failure(error) { return { type: hrModuleConstants.CREATE_FAMILY_DETAILS_FAILURE, error } }
}

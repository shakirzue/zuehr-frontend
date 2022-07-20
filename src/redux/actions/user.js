import { userConstants } from '../constants';
import { userService } from '../../services';
import { authenticationService } from '../../services/authentication.service';
import { alertActions } from './alert';
import { setCookieOid, setCookieNonCpcgrAuth, setLocalStorage, getLocalStorage, isSuccess, getObjWithProfileId } from "../../helpers/utils";

export const userActions = {
    createNonCpcgrUserProfileAction,
    loginNonCpcgrUserProfileAction,
    getUserProfileIdAction,
    forgetPasswordAction,
    forgetPasswordRequestAction,
    confirmTokenAction
};

// function createUserProfileAction(data, cb) {
//     return dispatch => {
//         dispatch(request());

//         Object.assign(data, { 'ObjectId': JSON.parse(localStorage.getItem('currentUser'))?.account.localAccountId, })

//         userService.createUserProfile(data)
//             .then(
//                 async response => {
//                     const { data } = response;
//                     if (data && data.length > 0) {
//                         dispatch(success());

//                         if (cb) {
//                             cb();
//                         }

//                         return;
//                     }

//                     dispatch(failure('No result found'));
//                     dispatch(alertActions.error('No result found'));

//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error.toString()));

//                 }
//             );
//     };

//     function request() { return { type: userConstants.CREATE_PROFILE_REQUEST, } }
//     function success() { return { type: userConstants.CREATE_PROFILE_SUCCESS, } }
//     function failure(error) { return { type: userConstants.CREATE_PROFILE_FAILURE, error } }
// }

function createNonCpcgrUserProfileAction(data, cb) {
    return dispatch => {
        dispatch(request());
        console.log(data, 210)
        userService.createNonCpcgrUserProfile(data)
            .then(
                async response => {
                    const { data } = response;
                    if (data) {
                        setLocalStorage(JSON.stringify({ account: { localAccountId: '' }, token: data.Token }), 'currentUser');
                        setLocalStorage(JSON.stringify(data.id), 'userProfileId');
                        setLocalStorage(JSON.stringify(data.id), 'personalDetailId');
                        setCookieOid(data.Password);
                        dispatch(success(data));
                        if (cb) {
                            setCookieNonCpcgrAuth(data.Token);
                            cb();
                        }

                        return;
                    }

                    dispatch(failure('No result found'));
                    dispatch(alertActions.error('No result found'));

                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()));

                }
            );
    };

    function request() { return { type: userConstants.CREATE_NONCPCGR_USER_REQUEST, } }
    function success(nonCpcgrUser) { return { type: userConstants.CREATE_NONCPCGR_USER_SUCCESS, nonCpcgrUser } }
    function failure(error) { return { type: userConstants.CREATE_NONCPCGR_USER_FAILURE, error } }
}

function loginNonCpcgrUserProfileAction(data, cb) {
    return dispatch => {
        dispatch(request());

        userService.loginNonCpcgrUserProfile(data)
            .then(
                async response => {
                    const { token, userProfileId } = response;
                    if (token) {
                        setLocalStorage(JSON.stringify({ account: { localAccountId: '' }, token: token }), 'currentUser');
                        setLocalStorage(JSON.stringify(userProfileId), 'userProfileId');
                        setCookieOid(0);
                        dispatch(success(token));
                        if (cb) {
                            setCookieNonCpcgrAuth(token);
                            cb();
                        }

                        return;
                    }

                    dispatch(failure('No result found'));
                    dispatch(alertActions.error('No result found'));

                },
                error => {
                    console.log(error,4646)
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()));

                }
            );
    };

    function request() { return { type: userConstants.GET_NONCPCGR_USER_LOGIN_REQUEST, } }
    function success(nonCpcgrUser) { return { type: userConstants.GET_NONCPCGR_USER_LOGIN_SUCCESS, nonCpcgrUser } }
    function failure(error) { return { type: userConstants.GET_NONCPCGR_USER_LOGIN_FAILURE, error } }
}

function forgetPasswordRequestAction(data, cb) {
    return dispatch => {
        dispatch(request());
        userService.forgetPasswordUserProfile(data)
            .then(
                async response => {
                    const { token, employeeNumber } = response;
console.log(token,555)
                    if (token !== "") {
                        setLocalStorage(token, 'token');
                        setLocalStorage(employeeNumber, 'userProfileId');
                        dispatch(success(token));
                        if (cb) {
                           // setCookieNonCpcgrAuth(isPasswordChanged);
                            cb();
                        }

                        return;
                    }

                    dispatch(failure('No result found'));
                    dispatch(alertActions.error('No result found'));

                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()));

                }
            );
    };

    function request() { return { type: userConstants.GET_USER_FORGOT_PASSWORD_REQUEST, } }
    function success(token) { return { type: userConstants.GET_USER_FORGOT_PASSWORD_SUCCESS, token } }
    function failure(error) { return { type: userConstants.GET_USER_FORGOT_PASSWORD_FAILURE, error } }
}

function forgetPasswordAction(data, cb) {
    return dispatch => {
        dispatch(request());
        userService.forgetPassword(data)
            .then(
                async response => {
                    const { isPasswordUpdated } = response;

                    if (isPasswordUpdated) {

                        dispatch(success(isPasswordUpdated));
                        if (cb) {
                            //setCookieNonCpcgrAuth(isPasswordUpdated);
                            cb();
                        }

                        return;
                    }

                    dispatch(failure('No result found'));
                    dispatch(alertActions.error('No result found'));

                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()));

                }
            );
    };

    function request() { return { type: userConstants.GET_USER_PASSWORD_UPDATED_REQUEST, } }
    function success(isPasswordUpdated) { return { type: userConstants.GET_USER_PASSWORD_UPDATED_SUCCESS, isPasswordUpdated } }
    function failure(error) { return { type: userConstants.GET_USER_FPASSWORD_UPDATED_FAILURE, error } }
}

function resetPasswordAction(data, cb) {
    return dispatch => {
        dispatch(request());
        userService.resetPassword(data)
            .then(
                async response => {
                    const { isPasswordChanged } = response;

                    if (isPasswordChanged) {

                        dispatch(success(isPasswordChanged));
                        if (cb) {
                            //setCookieNonCpcgrAuth(isPasswordUpdated);
                            cb();
                        }

                        return;
                    }

                    dispatch(failure('No result found'));
                    dispatch(alertActions.error('No result found'));

                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()));

                }
            );
    };

    function request() { return { type: userConstants.GET_USER_RESET_PASSWORD_REQUEST, } }
    function success(isPasswordUpdated) { return { type: userConstants.GET_USER_RESET_PASSWORD_SUCCESS, isPasswordUpdated } }
    function failure(error) { return { type: userConstants.GET_USER_RESET_PASSWORD_FAILURE, error } }
}

function changePasswordAction(data, cb) {
    return dispatch => {
        dispatch(request());
        userService.change.changePassword(data)
            .then(
                async response => {
                    const { isPasswordChanged } = response;

                    if (isPasswordChanged) {

                        dispatch(success(isPasswordChanged));
                        if (cb) {
                            //setCookieNonCpcgrAuth(isPasswordUpdated);
                            cb();
                        }

                        return;
                    }

                    dispatch(failure('No result found'));
                    dispatch(alertActions.error('No result found'));

                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()));

                }
            );
    };

    function request() { return { type: userConstants.GET_USER_CHANGE_PASSWORD_REQUEST, } }
    function success(isPasswordUpdated) { return { type: userConstants.GET_USER_CHANGE_PASSWORD_SUCCESS, isPasswordUpdated } }
    function failure(error) { return { type: userConstants.GET_USER_CHANGE_PASSWORD_FAILURE, error } }
}


function getUserProfileIdAction() {
    return dispatch => {
        dispatch(request());

        let data = { 'objectId': JSON.parse(localStorage.getItem('currentUser'))?.account.localAccountId, };

        userService.getUserProfileId(data)
            .then(
                async response => {
                    const { data, status } = response;

                    if (isSuccess(status)) {
                        const { id } = data;
                        await localStorage.setItem('userProfileId', id)
                        dispatch(success(id))
                    }

                    dispatch(failure('No result found'));
                    dispatch(alertActions.error('No result found'));

                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()));

                }
            );
    };

    function request() { return { type: userConstants.GET_PROFILE_ID_REQUEST, } }
    function success(profileId) { return { type: userConstants.GET_PROFILE_ID_SUCCESS, profileId } }
    function failure(error) { return { type: userConstants.CREATE_PROFILE_FAILURE, error } }
}

function confirmTokenAction(data, cb) {
    return dispatch => {
        console.log(data, 444)
        dispatch(request());

        userService.confirmTokenUserProfile(data)
            .then(
                async response => {
                    const { status, isTokenValid } = response;
                    console.log(response, 480)
                    if (isTokenValid) {

                        dispatch(success(isTokenValid, "",status));
                        if (cb) {
                            setCookieNonCpcgrAuth(data.Token);
                            cb();
                        }

                        return;
                    }

                    dispatch(failure(response.message));
                    dispatch(alertActions.error(response.message));

                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()));

                }
            );
    };

    function request() { return { type: userConstants.GET_USER_CONFIRM_TOKEN_REQUEST, } }
    function success(isVerified, requestType, statusCode) { return { type: userConstants.GET_USER_CONFIRM_TOKEN_SUCCESS, isVerified, requestType, statusCode } }
    function failure(error) { return { type: userConstants.GET_USER_CONFIRM_TOKEN_FAILURE, error } }
}
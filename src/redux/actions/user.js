import { userConstants } from '../constants';
import { userService } from '../../services';
import { authenticationService } from '../../services/authentication.service';
import { alertActions } from './alert';
import { setCookieOid, setCookieNonCpcgrAuth, setLocalStorage, getLocalStorage, isSuccess, getObjWithProfileId } from "../../helpers/utils";

export const userActions = {
    createNonCpcgrUserProfileAction,
    loginNonCpcgrUserProfileAction,
    getUserProfileIdAction,
    forgetPasswordAction
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
        console.log(data)
        userService.loginNonCpcgrUserProfile(data)
            .then(
                async response => {
                    const { data } = response;
                    if (data) {
                        console.log(data)
                        setLocalStorage(JSON.stringify({ account: { localAccountId: '' }, token: data.Token }), 'currentUser');
                        setLocalStorage(JSON.stringify(data.id), 'userProfileId');
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

    function request() { return { type: userConstants.GET_NONCPCGR_USER_LOGIN_REQUEST, } }
    function success(nonCpcgrUser) { return { type: userConstants.GET_NONCPCGR_USER_LOGIN_SUCCESS, nonCpcgrUser } }
    function failure(error) { return { type: userConstants.GET_NONCPCGR_USER_LOGIN_FAILURE, error } }
}

function forgetPasswordAction(data, cb) {
    return dispatch => {
        dispatch(request());
        console.log(data)
        userService.forgetPasswordUserProfile(data)
            .then(
                async response => {
                    const { data } = response;
                    if (data) {
                        console.log(data)
                        setLocalStorage(JSON.stringify(data.token), 'token');
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

    function request() { return { type: userConstants.GET_USER_FORGOT_PASSWORD_REQUEST, } }
    function success(newtoken) { return { type: userConstants.GET_USER_FORGOT_PASSWORD_SUCCESS, newtoken } }
    function failure(error) { return { type: userConstants.GET_USER_FORGOT_PASSWORD_FAILURE, error } }
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

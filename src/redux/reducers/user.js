import { userConstants } from '../constants';

const initialState = {
    permissions: [],
    defaultClient: null,
    profileId: null
}

export function users(state = initialState, action) {
    const { type, result, error, defaultClient, profileId, nonCpcgrUser, newtoken  } = action;
    switch (type) {
        case userConstants.GET_PERMISSIONS_REQUEST:
            return {
                ...initialState,
                loading: true
            };
        case userConstants.GET_PERMISSIONS_SUCCESS:
            return {
                ...initialState,
                permissions: result ? result : []
            };
        case userConstants.GET_PERMISSIONS_FAILURE:
            return {
                ...initialState,
                error: error
            };

        case userConstants.GET_DEFAULT_CLIENT_REQUEST:
            return {
                ...initialState,
                loading: true
            };
        case userConstants.GET_DEFAULT_CLIENT_SUCCESS:
            return {
                ...initialState,
                defaultClient: defaultClient
            };
        case userConstants.GET_DEFAULT_CLIENT_FAILURE:
            return {
                ...initialState,
                error: error
            };

        case userConstants.CREATE_PROFILE_REQUEST:
            return {
                ...initialState,
                loading: true
            };
        case userConstants.CREATE_PROFILE_SUCCESS:
            return {
                ...initialState,
                loading: false
            };
        case userConstants.CREATE_PROFILE_FAILURE:
            return {
                ...initialState,
                error: error,
                loading: false
            };
        case userConstants.CREATE_NONCPCGR_USER_REQUEST:
            return {
                    ...initialState,
                    loading: true
            };
        case userConstants.CREATE_NONCPCGR_USER_SUCCESS:
            return {
                    ...initialState,
                    nonCpcgrUser: nonCpcgrUser,
                    loading: false
            };
        case userConstants.CREATE_NONCPCGR_USER_FAILURE:
            return {
                    ...initialState,
                    error: error,
                    loading: false
            };
        case userConstants.GET_NONCPCGR_USER_LOGIN_REQUEST:
                return {
                        ...initialState,
                        loading: true
                };
        case userConstants.GET_NONCPCGR_USER_LOGIN_SUCCESS:
                return {
                        ...initialState,
                        nonCpcgrUser: nonCpcgrUser,
                        loading: false
                };
        case userConstants.GET_NONCPCGR_USER_LOGIN_FAILURE:
                return {
                        ...initialState,
                        error: error,
                        loading: false
                };
                case userConstants.GET_USER_FORGOT_PASSWORD_REQUEST:
                return {
                        ...initialState,
                        loading: true
                };
        case userConstants.GET_USER_FORGOT_PASSWORD_SUCCESS:
                return {
                        ...initialState,
                        newtoken: newtoken,
                        loading: false
                };
        case userConstants.GET_USER_FORGOT_PASSWORD_FAILURE:
                return {
                        ...initialState,
                        error: error,
                        loading: false
                };
        case userConstants.GET_PROFILE_ID_REQUEST:
                return {
                        ...initialState,
                        loading: true
                    };
        case userConstants.GET_PROFILE_ID_SUCCESS:
                return {
                        ...initialState,
                        profileId: profileId,
                        loading: false
                    };
        default:
            return state
    }
}
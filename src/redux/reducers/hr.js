import { hrModuleConstants } from '../constants';

const initialState = {
    lookups: {},
    loading: false,
    companyData: null,
    personalData: null,
    genders: [],
    profileDetails: [],
    singleProfileDetail: {},
}

export function hrModule(state = initialState, action) {
    const { type, error, data, personalData, genders, profileDetails, companyData, singleProfileDetail } = action;

    switch (type) {
        case hrModuleConstants.GET_HR_LOOKUPS_REQUEST:
            return {
                ...initialState,
                loading: true
            };
        case hrModuleConstants.GET_HR_LOOKUPS_SUCCESS:
            return {
                ...initialState,
                lookups: data
            };
        case hrModuleConstants.GET_HR_LOOKUPS_FAILURE:
            return {
                ...initialState,
                error: error
            };

        case hrModuleConstants.CREATE_PERSONAL_DETAILS_REQUEST:
            return {
                ...initialState,
                loading: true
            };
        case hrModuleConstants.CREATE_PERSONAL_DETAILS_SUCCESS:
            return {
                ...initialState,
                loading: false,
                personalData: personalData
            };
        case hrModuleConstants.CREATE_PERSONAL_DETAILS_FAILURE:
            return {
                ...initialState,
                error: error
            };

        case hrModuleConstants.GET_GENDERS_LOOKUPS_REQUEST:
            return {
                ...initialState,
                loading: true
            };
        case hrModuleConstants.GET_GENDERS_LOOKUPS_SUCCESS:
            return {
                ...initialState,
                genders: genders
            };

        case hrModuleConstants.GET_PERSONAL_DETAILS_REQUEST:
            return {
                ...initialState,
                loading: true
            };
        case hrModuleConstants.GET_PERSONAL_DETAILS_SUCCESS:
            return {
                ...initialState,
                profileDetails: profileDetails
            };
        case hrModuleConstants.GET_PERSONAL_DETAILS_FAILURE:
            return {
                ...initialState,
                error: error
            };

        case hrModuleConstants.CREATE_COMPANY_DETAILS_REQUEST:
            return {
                ...initialState,
                loading: true
            };
        case hrModuleConstants.CREATE_COMPANY_DETAILS_SUCCESS:
            return {
                ...initialState,
                loading: false,
                companyData: companyData
            };
        case hrModuleConstants.CREATE_COMPANY_DETAILS_FAILURE:
            return {
                ...initialState,
                error: error
            };

        case hrModuleConstants.GET_SINGLE_PERSONAL_DETAILS_REQUEST:
            return {
                ...initialState,
                loading: true
            };
        case hrModuleConstants.GET_SINGLE_PERSONAL_DETAILS_SUCCESS:
            return {
                ...initialState,
                loading: false,
                singleProfileDetail: singleProfileDetail
            };
        case hrModuleConstants.GET_SINGLE_PERSONAL_DETAILS_FAILURE:
            return {
                ...initialState,
                error: error
            };

        default:
            return state
    }
}

export function familyInfo(state = { loading: false, family: [] }, action) {
    const { type, error, data } = action;

    switch (type) {
        case hrModuleConstants.CREATE_FAMILY_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case hrModuleConstants.CREATE_FAMILY_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
            };


        case hrModuleConstants.GET_FAMILY_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                family: data
            };

        case hrModuleConstants.CREATE_FAMILY_DETAILS_FAILURE:
            return {
                ...state,
                error: error,
                loading: false,
            };



        default:
            return state
    }
}

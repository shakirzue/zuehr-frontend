import { attendanceConstants } from '../constants';

const initialState = {
    defaultClient: null,
    loading: false,
    checkOut: null,
    shifts: null,
    shiftWeeks : null

}

export function attendance(state = initialState, action) {
    const { type, error, defaultClient, attendance, checkOut, checkAlready, shiftData, shifts, shiftWeeks } = action;
    switch (type) {
        case attendanceConstants.CREATE_ATTENDANCE_REQUEST:
            return {
                ...initialState,
                loading: true
            };
        case attendanceConstants.CREATE_ATTENDANCE_SUCCESS:
            return {
                ...initialState,
                defaultClient: defaultClient
            };
        case attendanceConstants.ALREADY_MARK_ATTENDANCE_SUCCESS:
            return {
                ...initialState,
                checkAlready: checkAlready
            };
        case attendanceConstants.SEARCH_ATTENDANCE_SUCCESS:
            return {
                ...initialState,
                attendance: attendance
            };
        case attendanceConstants.GET_ATTENDANCE_SUCCESS:
            return {
                ...initialState,
                attendance: attendance
            };
        case attendanceConstants.CREATE_ATTENDANCE_FAILURE:
            return {
                ...initialState,
                error: error
            };

        case attendanceConstants.CHECKOUT_ATTENDANCE_REQUEST:
            return {
                ...initialState,
                loading: true
            };
        case attendanceConstants.CHECKOUT_ATTENDANCE_SUCCESS:
            return {
                ...initialState,
                checkOut: checkOut
            };
        case attendanceConstants.CHECKOUT_ATTENDANCE_FAILURE:
            return {
                ...initialState,
                error: error
            };
        case attendanceConstants.CREATE_SHIFT_DETAILS_REQUEST:
                return {
                    ...initialState,
                    loading: true
                };
        case attendanceConstants.CREATE_SHIFT_DETAILS_SUCCESS:
                return {
                    ...initialState,
                    shiftData: shiftData
                };
        case attendanceConstants.CREATE_SHIFT_DETAILS_FAILURE:
                return {
                    ...initialState,
                    error: error
                };
        case attendanceConstants.GET_SHIFT_REQUEST:
                    return {
                        ...initialState,
                        loading: true
                    };
        case attendanceConstants.GET_SHIFT_SUCCESS:
                    return {
                        ...initialState,
                        shifts: shifts
                    };
        case attendanceConstants.GET_SHIFT_FAILURE:
                    return {
                        ...initialState,
                        error: error
                    };
        case attendanceConstants.CREATE_SHIFT_WEEKS_REQUEST:
                        return {
                            ...initialState,
                            loading: true
                        };
        case attendanceConstants.GET_SHIFT_WEEKS_SUCCESS:
            return {
                ...initialState,
                shiftWeeks: shiftWeeks
            };
        case attendanceConstants.CREATE_SHIFT_WEEKS_SUCCESS:
                        return {
                            ...initialState,
                            shiftWeeks: shiftWeeks
                        };
        case attendanceConstants.CREATE_SHIFT_WEEKS_FAILURE:
                        return {
                            ...initialState,
                            error: error
                        };
        default:
            return state
    }
}
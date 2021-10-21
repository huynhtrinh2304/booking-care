import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    positions: [],
    roles: [],
    timeSchedule: [],
    isCreatedUser: '',
    dataUser: [],
    topDoctors: [],
    allDoctors: [],
    dataAllCode: []


}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;

            return {
                ...copyState,

            }

        case actionTypes.FETCH_GENDER_SUCCESS:

            state.genders = action.data;
            state.isLoadingGender = false;



            return {
                ...state,

            }

        case actionTypes.FETCH_GENDER_FAIL:


            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,

            }





        case actionTypes.FETCH_POSITION_SUCCESS:

            state.positions = action.data;

            return {
                ...state,

            }

        case actionTypes.FETCH_POSITION_FAILED:

            state.positions = [];
            return {
                ...state,

            }





        case actionTypes.FETCH_ROLE_SUCCESS:

            state.roles = action.data;

            return {
                ...state,

            }

        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];

            return {
                ...state,

            }





        case actionTypes.CREATE_USER_SUCCESS:
            state.isCreatedUser = action.errMessage;

            return {
                ...state,

            }

        case actionTypes.CREATE_USER_FAILED:
            state.isCreatedUser = action.errMessage;

            return {
                ...state,

            }





        case actionTypes.GET_ALL_USER_SUCCESS:

            state.dataUser = action.data
            return {
                ...state,
            }

        case actionTypes.GET_ALL_USER_FAILED:

            state.dataUser = []
            return {
                ...state,

            }


        //Get top doctor   
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:

            state.topDoctors = action.data;

            return {
                ...state,

            }

        //Get top doctor   
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:

            state.topDoctors = [];

            return {
                ...state,

            }



        //Get top doctor   
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:

            state.allDoctors = action.doctors;


            return {
                ...state,

            }

        //Get top doctor   
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:

            state.allDoctors = [];

            return {
                ...state,

            }


        //Time Schedule
        case actionTypes.FETCH_ALLCODE_SCHEDULE_SUCCESS:

            state.timeSchedule = action.data;

            return {
                ...state,

            }

        //Time Schedule
        case actionTypes.FETCH_ALLCODE_SCHEDULE_FAILED:

            state.timeSchedule = [];

            return {
                ...state,

            }



        // PRICE PAYMENT PROVINCE allcode
        case actionTypes.FETCH_PRICE_PAYMENT_PROVINCE_SUCCESS:

            state.dataAllCode = action.data;



            return {
                ...state,
            }

        case actionTypes.FETCH_PRICE_PAYMENT_PROVINCE_FAILED:
            state.dataAllCode = [];



            return {
                ...state,
            }
















        default:
            return state;
    }
}

export default adminReducer;
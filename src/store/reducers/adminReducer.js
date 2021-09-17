import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    positions: [],
    roles: [],
    isCreatedUser: [],
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
            state.isCreatedUser = [true, action.errMessage];

            return {
                ...state,

            }

        case actionTypes.CREATE_USER_FAILED:
            state.isCreatedUser = [false, action.errMessage];

            return {
                ...state,

            }

















        default:
            return state;
    }
}

export default adminReducer;
import actionTypes from './actionTypes';
import { getAllCodeServicesApi, createNewUserApi } from '../../services/userService'





//GENDER
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START,
            })
            let res = await getAllCodeServicesApi('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed())
            }
        } catch (error) {
            dispatch(fetchGenderFailed())
            console.log('fetchGenderStart', error);
        }
    }
}


//GENDER
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData

});
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})





//POSITION
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeServicesApi('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed())
            }
        } catch (error) {
            dispatch(fetchPositionFailed())
            console.log('fetchPositionFailed', error);
        }
    }
}


//POSITION
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILEDED
})





//ROLE
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeServicesApi('ROLE');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed())
            }
        } catch (error) {
            dispatch(fetchRoleFailed())
            console.log('fetchRoleFailed', error);
        }
    }
}


//ROLE
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILEDED
})





//CREATE USER BY REDUX
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            console.log(data);
            let res = await createNewUserApi(data);
            if (res && res.errCode === 0) {
                dispatch(createUserSuccess(res.errMessage));
            } else {
                dispatch(createUserFailed(res.errMessage));
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log('createUserFailed', error);
        }
    }
}


//CREATE USER BY REDUX
export const createUserSuccess = (errMessage) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    errMessage: errMessage
})
export const createUserFailed = (errMessage) => ({
    type: actionTypes.CREATE_USER_FAILED,
    errMessage: errMessage
})




import actionTypes from './actionTypes';
import { getAllCodeServicesApi, createNewUserApi, getAllUsers, deleteUserApi, updateUserApi } from '../../services/userService'
import { toast } from 'react-toastify';




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

            let res = await createNewUserApi(data);

            if (res && res.errCode === 0) {
                toast.success("Create a new user success")
                dispatch(createUserSuccess(res.errMessage));
                dispatch(getAllUsersRedux());

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




//READ USER BY REDUX
export const getAllUsersRedux = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllUsers("ALL");

            if (res && res.errCode === 0) {
                dispatch(getUsersSuccess(res.users.reverse()));
            } else {
                dispatch(getUsersFailed());
            }
        } catch (error) {
            dispatch(getUsersFailed());
            console.log('createUserFailed', error);
        }
    }
}


//READ USER BY REDUX
export const getUsersSuccess = (data) => ({
    type: actionTypes.GET_ALL_USER_SUCCESS,
    data: data
})
export const getUsersFailed = () => ({
    type: actionTypes.GET_ALL_USER_FAILED,

})




//DELETE USER BY ID
export const deleteUserById = (id) => {

    return async (dispatch, getState) => {

        try {

            let res = await deleteUserApi(id);




            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess());
                dispatch(getAllUsersRedux());

            } else {
                dispatch(deleteUserFailed());
            }
        } catch (error) {
            dispatch(deleteUserFailed());
            console.log('deleteUserFailed', error);
        }
    }
}



//DELETE USER BY REDUX
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,

})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})



//UPDATE USER BY ID
export const updateUserRedux = (data) => {

    return async (dispatch, getState) => {

        try {

            let res = await updateUserApi(data);

            if (res && res.errCode === 0) {
                dispatch(updateUserSuccess());
                toast.success('Update Success')
                dispatch(getAllUsersRedux());

            } else {
                dispatch(deleteUserFailed());
            }
        } catch (error) {
            dispatch(updateUserFailed());
            console.log('updateUserFailed', error);
        }
    }
}



//UPDATE USER BY REDUX
export const updateUserSuccess = () => ({
    type: actionTypes.UPDATE_USER_SUCCESS

})
export const updateUserFailed = () => ({
    type: actionTypes.UPDATE_USER_FAILED,
})

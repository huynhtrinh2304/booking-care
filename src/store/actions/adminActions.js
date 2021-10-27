import actionTypes from './actionTypes';
import {
    getAllCodeServicesApi,
    createNewUserApi, getAllUsers,
    deleteUserApi,
    updateUserApi,
    getTopDoctorHomeService
} from '../../services/userService'

import { getAllDoctorsService, postInforDoctorService, getDetailDoctorService } from '../../services/doctorService'

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
                dispatch(createUserSuccess(res));
                dispatch(getAllUsersRedux());

            } else {
                dispatch(createUserFailed(res));
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



//UPDATE USER BY EMAIL
export const updateUserRedux = (data) => {

    return async (dispatch) => {

        try {
            console.log(data);
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

// Get top doctor
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService(10);

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    data: res.users
                });


            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                });
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            });
        }
    }
}



export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorsService();

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    doctors: res.doctors,
                });


            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                });
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            });
        }
    }
}

// Get top doctor
export const postInforDoctor = (inforDoctor) => {
    return async (dispatch, getState) => {
        try {

            let res = await postInforDoctorService(inforDoctor);

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.POST_INFOR_DOCTORS_SUCCESS,
                });

                toast.success('Save Success');
                return true;

            } else {
                dispatch({
                    type: actionTypes.POST_INFOR_DOCTORS_FAILED,
                });

                toast.error('Save error');
                return false;

            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            });
        }
    }
}

//TIME
export const fetchTimeSchedule = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeServicesApi('TIME');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_SUCCESS,
                    data: res.data
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_SUCCESS
                })
            }
        } catch (error) {
            console.log('fetchTimeScheduleFailed', error);
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_SUCCESS
            })

        }
    }
}


//Data allcode
export const fetchDataFromAllCode = () => {
    return async (dispatch, getState) => {
        try {

            let resPrice = await getAllCodeServicesApi("PRICE");
            let resPayment = await getAllCodeServicesApi("PAYMENT");
            let resProvince = await getAllCodeServicesApi("PROVINCE");

            if (
                resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0
            ) {

                let data = {
                    price: resPrice.data,
                    payment: resPayment.data,
                    province: resProvince.data,

                }
                dispatch({
                    type: actionTypes.FETCH_PRICE_PAYMENT_PROVINCE_SUCCESS,
                    data: data
                });

            } else {
                dispatch({
                    type: actionTypes.FETCH_PRICE_PAYMENT_PROVINCE_FAILED,
                });
            }




        } catch (error) {
            console.log('fetchDataFromAllCode', error);
            dispatch({
                type: actionTypes.FETCH_PRICE_PAYMENT_PROVINCE_FAILED,
            });
        }
    }
}




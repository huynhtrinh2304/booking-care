import axios from '../axios'


const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', {

        email: userEmail,
        password: userPassword,

    })
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`, {
        id: inputId,
    })
}

const createNewUserApi = (data) => {

    return axios.post('/api/create-new-user', data);
}

const deleteUserApi = (userId) => {
    return axios.delete('/api/delete-user', {
        data: { id: userId }
    });

}

const updateUserApi = (data) => {
    return axios.put('/api/edit-user', data);

}

const getAllCodeServicesApi = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)

}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)

}



export {
    handleLoginApi,
    getAllUsers,
    createNewUserApi,
    deleteUserApi,
    updateUserApi,
    getAllCodeServicesApi,
    getTopDoctorHomeService
}
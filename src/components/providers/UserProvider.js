import axios from 'axios';
const BASE_URL = 'http://localhost:8080/';


const createUser = (user) => {

    return axios.post(BASE_URL+'users', user);
 }
 
const login = (payload) => {
    return axios.post(BASE_URL+'login', payload);
}

const getUsers = () => {
    return axios.get(BASE_URL+'users');
}

const saveUser = (user) => {
    sessionStorage.setItem('user', JSON.stringify(user));
}



 const getUserData = () => {
     return JSON.parse(sessionStorage.getItem('user'));
 }

 const getToken = () => {
     return getUserData().accessToken;
 }
 





export {
    login,
    getUsers,
    saveUser,
    createUser,
    getUserData,
    getToken
}
// import axios from 'axios';
// const BASE_URL = 'http://localhost:8080/';


// const createUser = (user) => {

//     return axios.post(BASE_URL+'users', user);
//  }
 
// const login = (payload) => {
//     return axios.post(BASE_URL+'login', payload);
// }


// const saveUser = (user) => {
//     sessionStorage.setItem('user', JSON.stringify(user));
// }

 const getUserData = () => {
     return {"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndhaXRlckBmb29kZWxpY2lvdXMuY29tIiwiaWF0IjoxNjU0Mjg4MjA0LCJleHAiOjE2NTQyOTE4MDQsInN1YiI6IjMifQ.9j4oHuY3ZA1hmrljD3390K4jjrOYMb0tAO9BAUMZnWo","user":{"email":"waiter@foodelicious.com","roles":{"waiter":true},"id":3}};
 }

 const getToken = () => {
     return "tokenx";
 }

//  const getId = () => {
//     return getUserData().user.id;
// }

// const getUser = () => {
//     return axios({method: "GET", url:BASE_URL+'users', headers: {
//         authorization: "Bearer " + getToken()
//     }} );
// }


 





export {
    getUserData,
    getToken
}

// const getUsers = () => {
//     return axios.get(BASE_URL+'users',{
//         headers: {
//             authorization: 'Bearer ' + getToken()
//         }
    
// });
// }

// const getId = () => {
//         return getUserData().id;
//     }
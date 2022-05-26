import axios from 'axios';
import { getToken } from './UserProvider';
const BASE_URL = 'http://localhost:8080/';

const products = () => {

    return axios({method: "GET", url:BASE_URL+'products', headers: {
        authorization: "Bearer " + getToken()
    }} );
 } 

 const createProduct = (product) => {
    return axios.post(BASE_URL+'products', product, {
        headers: {
            authorization: 'Bearer ' + getToken()
        }

    });
}

const deleteProduct = (id) => {
    return axios.delete(BASE_URL+'products/'+id, {
        headers: {
            authorization: 'Bearer ' + getToken()
        }
    });
}

const createOrder = (order) => {
    return axios.post(BASE_URL+'orders', order, {
        headers: {
            authorization: 'Bearer ' + getToken()
        }
    });
}

const getOrder = () => {
    return axios.get(BASE_URL+'orders', {
        headers: {
            authorization: 'Bearer ' + getToken()
        }
    });
}

const updateOrder = (id, update) => { 
 return axios.patch(BASE_URL+'orders/'+id, update, {
        headers: {
            authorization: 'Bearer ' + getToken()  
    
        }
    });
}

 export {products, createProduct, deleteProduct, createOrder, getOrder, updateOrder} ;
   
 
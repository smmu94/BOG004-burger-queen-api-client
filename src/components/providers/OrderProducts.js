import axios from 'axios';
import { getToken } from './UserProvider';
const BASE_URL = 'http://localhost:8080/';

const products = () => {

    return axios({method: "GET", url:BASE_URL+'products', headers: {
        authorization: "Bearer " + getToken()
    }} );
 } 

 export default products;
   
 
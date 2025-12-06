import axios from 'axios';

const API = axios.create({
    baseURL:'https://fineaseserver-phi.vercel.app'
});

export default API;

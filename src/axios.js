import axios from 'axios';
import _ from 'lodash';
// import config from './config';

const instance = axios.create({
    baseURL: 'https://d3hkqf22fib3gs.cloudfront.net/',
    // withCredentials: true
});

instance.interceptors.response.use(
    (response) => {
        const { data } = response;
        return response.data;
    }
);

export default instance;

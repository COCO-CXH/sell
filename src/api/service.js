import axios from 'axios';
import qs from 'qs';
// import { getToken } from '@/util/auth';

const service = axios.create({
    baseURL: process.env.BASE_API || 'http://localhost:8080', // api的base_url
    timeout: 200000 // 20s
});

const successCode = 200;

const request = (method, url, data, config) => {
    if (!config) {
        config = data ? Object.assign({}, data) : {};
        data = {};
    }
    const options = Object.assign({}, config, {
        method,
        url,
        data
    });
    return new Promise((resolve, reject) => {
        service.request(options)
            .then(res => {
                let {
                    data,
                    status
                } = res;
                if (status === successCode) {
                    resolve(data, res)
                } else {
                    reject(res);
                }
            }).catch(reason => {
                reject(reason);
            });
    });
};

export default {
    get(url, params, config = {}) {
        return request('get', url, { ...config,
            params
        });
    },
    delete(url, config) {
        return request('delete', url, config);
    },
    head(url, config) {
        return request('head', url, config);
    },
    post(url, data, config = {}) {
        return request('post', url, qs.stringify(data), config);
    },
    put(url, data, config = {}) {
        return request('put', url, data, config);
    },
    patch(url, data, config) {
        return request('patch', url, qs.stringify(data), config);
    }
};

// service.interceptors.request.use(config => {
//         const token = getToken();
//         if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
//             if (config.method === 'post') {
//                 config.data = `${config.data}&token=${token}`;
//             } else { // get
//                 config.params = config.params || {};
//                 config.params['token'] = token;
//             }
//         }
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
//     });

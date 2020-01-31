import axios from 'axios';
const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '' : '',
});
//请求拦截
instance.interceptors.request.use(
    (req: any) => {
        return Promise.resolve(req);
    },
    (err: Error) => {
        return Promise.reject(err);
    }
);
//响应拦截
instance.interceptors.response.use(
    (res: any) => {
        return Promise.resolve(res);
    },
    (err: Error) => {
        return Promise.reject(err);
    }
);
export default instance;

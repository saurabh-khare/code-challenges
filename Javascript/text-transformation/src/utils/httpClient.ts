import axios, { AxiosInstance } from 'axios';
const client = (url: string): AxiosInstance => {
    return axios.create({
        baseURL: url,
        headers: {
            'Content-Type': 'application/json',
        },
        responseType: 'json',
    });
};
export default client;

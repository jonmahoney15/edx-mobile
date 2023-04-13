import axios from 'axios';
import { BASE_URL, CSRF_TOKEN_API_PATH, AUTH_TOKEN } from '@env'

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
    }
});

const retrieveToken = async() => {
    return axios.get(BASE_URL+CSRF_TOKEN_API_PATH)
        .then(response => response.data.csrfToken)
        .catch(error => {
            console.log("An Error occured loading the csrf token");
            console.log(error)
            return null;
        });
}

api.interceptors.request.use(async config => {
    if (!config.headers['X-CSRFToken']) {
        const token = await retrieveToken();
        
        if (token) {
            config.headers['X-CSRFToken'] = token;
        }
    }

    return config;
}, error => {
    console.log("Error in intecept")
    Promise.reject(error);
});

export { api };

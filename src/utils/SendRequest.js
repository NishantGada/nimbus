import axios from 'axios';

const sendRequest = (path, data, method = 'POST', headers = {}) => {
    path = "http://localhost:8080" + path;
    switch (method) {
        case 'POST':
            return axios.post(path, data, { headers });
        case 'GET':
            return axios.get(path, { headers });
        case 'PUT':
            return axios.put(path, data, { headers });
        case 'DELETE':
            return axios.delete(path, { headers });
        default:
            throw new Error(`Unsupported method: ${method}`);
    }
};

export default sendRequest;
import {API, USER_URL} from './config';

export default {
    getUser: async () => {
        try {
            const response = await API.get(`${USER_URL}/users`);
            return response;
        } catch (error) {
            console.log('User Error', error);
            return error.response;
        }
    },
    getPost: async () => {
        try {
            const response = await API.get(`${USER_URL}/posts`);
            return response;
        } catch (error) {
            console.log('Post Error', error);
            return error.response;
        }
    }
}
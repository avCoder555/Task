import { API, WORLD_TIME_URL } from "./config";

export default {
    getCountry: async () => {
        try {
            const response = await API.get(`${WORLD_TIME_URL}/api/timezone`);
            return response;
        } catch (error) {
            console.log('Get Country List Error', error);
            return error.response;
        }
    }
 }
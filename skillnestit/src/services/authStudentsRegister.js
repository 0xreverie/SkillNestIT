import { axiosInstance } from '../lib/axios';

export const registerStudent = async (data) => {
    try {
        const response = await axiosInstance.post('/register', data);
        // console.log(response.data);
        return response.data;
    } catch (err) {
        console.error("Error during registration:", err);
        throw err;
    }
};

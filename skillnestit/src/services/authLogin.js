import { axiosInstance } from '../lib/axios';

export const registerData = async (data) => {
    try {
        const response = await axiosInstance.post('/login', data);
        const { token, role, id: userId } = response.data;

        // Simpan data autentikasi
        localStorage.setItem('token', token);
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('role', role);
        return { role };
    } catch (err) {
        console.error(err);
        throw err;
    }
};

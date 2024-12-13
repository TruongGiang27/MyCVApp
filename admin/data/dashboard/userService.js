import axios from 'axios';

const apiUrl = 'http://192.168.0.108:3000/users/';

export const getUsers = async () => {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
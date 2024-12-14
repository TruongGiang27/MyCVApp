import axios from 'axios';

const apiUrl = 'http://localhost:3001/users/';

export const getUsers = async () => {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
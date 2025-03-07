import { api } from './index';

export const fetchProfileName = async (Profile_Id) => {
    try {
        const response = await api.get(`/profiles/${Profile_Id}`);
        console.log(response);
        return response.data.;
    }
    catch (error) {
        console.error('Failed to fetch user name:', error);
        return { success: false, message: 'Failed to fetch user name', error: error.message };
    }
}
import { api } from './index';


export const fetchProfileName = async (Profile_Id) => {
    try {
        const response = await api.get(`/profiles/${Profile_Id}`);
        console.log(response);
        return response.data.username;
    }
    catch (error) {
        console.error('Failed to fetch user name:', error);
        return { success: false, message: 'Failed to fetch user name', error: error.message };
    }
}
//currently used to update profile name
//data should be {username: 'new user name'}
export const updateProfile = async (Profile_Id, username) => {
    try {

        const response = await api.put(`/profiles/${Profile_Id}`, {"full_name": username, "updated_at": new Date().toISOString()});
        console.log(response);
        return response.data;
    }
    catch (error) {
        console.error('Failed to update user name:', error);
        return { success: false, message: 'Failed to update user name', error: error.message };
    }
}
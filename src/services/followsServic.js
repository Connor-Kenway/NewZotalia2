import { api } from './index';
//used to get the people who follow the gig worker and the gig worker follows
export const fetchFollowers = async (Profile_Id) => {
    try {
        const response = await api.get(`/follows/${Profile_Id}/followed`);
        console.log(response);
        return response.data;
    }
    catch (error) {
        console.error('Failed to fetch user follows:', error);
        return { success: false, message: 'Failed to fetch user follows', error: error.message };
    }
}

export const fetchFollowing = async (Profile_Id) => {
    try {
        const response = await api.get(`/follows/${Profile_Id}/following`);
        console.log(response);
        return response.data;
    }
    catch (error) {
        console.error('Failed to fetch user following:', error);
        return { success: false, message: 'Failed to fetch user following', error: error.message };
    }
}

export const fetchFollowersCount = async (Profile_Id) => {
    try {
        console.log(Profile_Id);
        const response = await api.get(`/follows/${Profile_Id}/followed/count`);
        console.log(response);
        return response.data;
    }
    catch (error) {
        console.error('Failed to fetch user follows:', error);
        return { success: false, message: 'Failed to fetch user follows', error: error.message };
    }
}

export const fetchFollowingCount = async (Profile_Id) => {
    try {
        const response = await api.get(`/follows/${Profile_Id}/followers/count`);
        console.log(response);
        return response.data;
    }
    catch (error) {
        console.error('Failed to fetch user following:', error);
        return { success: false, message: 'Failed to fetch user following', error: error.message };
    }
}

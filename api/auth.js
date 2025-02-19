import { api, setAuthToken } from './index';
export const signUp = async (data) => {
    const response = await api.post('/signup', data);
    return response.data;
  };
  
  export const signIn = async (data) => {
    const response = await api.post('/token', data);
    const { access_token } = response.data;
    setAuthToken(access_token);
    return response.data;
  };
  
  export const signOut = async () => {
    await api.post('/signout');
    setAuthToken(null);
  };
import { signInApi, setAuthToken, api } from './index';

export const signUp = async (data) => {
    console.log(data)
    const response = await api.post('/signup', data);
    console.log(response)
    console.log('after response')
    return response.data;
  };
  
  export const signIn = async (data) => {
    console.log(data)
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    const response = await signInApi.post('/token', data);
    const { access_token } = response.data;
    setAuthToken(access_token);
    return response.data;
  };
  
  export const signOut = async () => {
    await api.post('/signout');
    setAuthToken(null);
  };
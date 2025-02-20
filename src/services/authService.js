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
    console.log(data,'breaking here')
    formData.append('username', data.email);
    formData.append('password', data.password);

    const response = await signInApi.post('/token', formData);
    const { access_token } = response.data;
    setAuthToken(access_token);
    console.log('success')
    return response.data;
  };
  
  export const signOut = async () => {
    await api.post('/signout');
    setAuthToken(null);
  };
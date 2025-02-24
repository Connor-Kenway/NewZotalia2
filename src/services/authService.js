import { signInApi, setAuthToken, api } from './index';
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    console.log('access_token', access_token)
    setAuthToken(access_token);
    await AsyncStorage.setItem('access_token', access_token);
    console.log('success', access_token)
    return response.data;
  };
  
  export const signOut = async () => {
    await api.post('/signout');
    setAuthToken(null);
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('userType');
  };
  
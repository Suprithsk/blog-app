
import apiClient from './apiClient';
import { AxiosError } from 'axios';
import { UserSignUp, UserSignIn } from '../types/types';

export const login = async (credentials: UserSignIn) => {
    try {
        const response = await apiClient.post('/auth/login', credentials);
        return response.data;
    } catch (error:unknown) {
        if(error instanceof AxiosError) {
            console.error(error);
            if(error?.response?.data?.error) {
                throw new Error(error.response.data.error);
            }
            throw new Error('Something went wrong!');
        }
        console.error(error);
        throw new Error('Invalid username or password');
    }
  
};

export const register = async (userInfo: UserSignUp) => {
    try {
        const response = await apiClient.post('/auth/signup', userInfo);
        return response.data;
    } catch (error:unknown) {
        if(error instanceof AxiosError) {
            console.error(error);
            if(error?.response?.data?.error) {
                throw new Error(error.response.data.error);
            }
            throw new Error('Something went wrong!');
        }
        console.error(error);
        throw new Error('Invalid username or password');
    }
};
export const getUser = async () => {
    try {
        const response = await apiClient.get('/auth');
        return response.data;
    } catch (error:unknown) {
        if(error instanceof AxiosError) {
            console.error(error);
            if(error?.response?.data?.error) {
                throw new Error(error.response.data.error);
            }
            throw new Error('Something went wrong!');
        }
        console.error(error);
        throw new Error('Invalid username or password');
    }
}
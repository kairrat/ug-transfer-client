import { authApi } from '../api/AuthApi';

export const requestCode = async (phone: string) => {
    const { data } = await authApi.requestCode(phone);
    console.log('Request code response: ', data);
    return data;
};

export const verifyCode = async (phone: string, code: string) => {
    const { data } = await authApi.verifyCode(phone, code);
    console.log('Verify code response: ', data);
    return data;
};
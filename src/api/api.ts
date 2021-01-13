import { UserType } from './../types/types';
import axios, { AxiosResponse } from 'axios';
import { ProfileType } from '../types/types';


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "api-key": "59e559f3-c48c-45df-865e-82e51afdf429"
    }
});


export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10,
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}


export type APIResponseType<D={}, RC=ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

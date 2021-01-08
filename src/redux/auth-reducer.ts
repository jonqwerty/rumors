import { stopSubmit } from "redux-form";
import { authAPI,ResultCodeForCaptcha,ResultCodesEnum,securityAPI  } from "../api/api";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

// export type InitialStateType2 = {
//     userId: number | null
//     email: string | null
//     login: string | null
//     isAuth: boolean
//     captchaUrl: string | null
// }

let initialState  = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState

const authReducer = (state=initialState, action: any): InitialStateType => {
    switch(action.type) {
        case SET_USER_DATA:
            return { 
                ...state,
                ...action.payload,  
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return { 
                ...state,
                ...action.payload,   
            }
        default:
            return state;
    }       
}

type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA 
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA, payload: 
    {userId, email, login, isAuth} 
})

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string }
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: 
    {captchaUrl} 
})

// export const getAuthUserData = ( ) => (dispatch) => {
//     return authAPI.me()
//             .then(response => {
//                     if(response.data.resultCode ===0) {
//                         let {id, login, email} = response.data.data;
//                         dispatch(setAuthUserData(id, email, login, true));
//                     } 
//             });
// }

export const getAuthUserData = () => async (dispatch: any) => {
    let meData = await authAPI.me()

    if (meData.resultCode === ResultCodesEnum.Success) {
        let { id, login, email } = meData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

// export const login = (email, password, rememberMe) => (dispatch) => {
//     authAPI.login(email, password, rememberMe)
//         .then(response => {
//             if (response.data.resultCode === 0) {
//                 dispatch(getAuthUserData())
//             } else {
//                 let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
//                 dispatch(stopSubmit('login', { _error: message }));
//             }
//         });
// }

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let data = await authAPI.login(email, password, rememberMe, captcha)
        
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        // why it noy work ResultCodeForCaptcha.CaptchaIsRequired
        if (data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', { _error: message }));
    }       
}

// export const logout = () => (dispatch) => {
//     authAPI.logout()
//         .then(response => {
//             if (response.data.resultCode === 0) {
//                 dispatch(setAuthUserData(null, null, null, false))
//             }
//         });
// }

export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    
    dispatch(getCaptchaUrlSuccess(captchaUrl));
                
}

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout()
       
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }        
}

export default authReducer;
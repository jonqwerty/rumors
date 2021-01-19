import { Action } from "redux"
import { FormAction, stopSubmit } from "redux-form"
import { setConstantValue, setSyntheticTrailingComments } from "typescript"
import { ResultCodeForCaptchaEnum,ResultCodesEnum  } from "../api/api"
import { authAPI } from "../api/auth-api"
import { securityAPI } from "../api/security-api"
import { BaseThunkType, InferActionsTypes } from "./redux-store"

// const SET_USER_DATA = 'R/auth/SET_USER_DATA'
// const GET_CAPTCHA_URL_SUCCESS = 'R/auth/GET_CAPTCHA_URL_SUCCESS'


let initialState  = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState


type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType | FormAction>

const authReducer = (state=initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'R/auth/SET_USER_DATA':
            return { 
                ...state,
                ...action.payload,  
            }
        case 'R/auth/GET_CAPTCHA_URL_SUCCESS':
            return { 
                ...state,
                ...action.payload,   
            }
        default:
            return state;
    }       
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'R/auth/SET_USER_DATA', payload: {userId, email, login, isAuth} 
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'R/auth/GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl} 
    } as const)
    
}


// export const getAuthUserData = ( ) => (dispatch) => {
//     return authAPI.me()
//             .then(response => {
//                     if(response.data.resultCode ===0) {
//                         let {id, login, email} = response.data.data;
//                         dispatch(setAuthUserData(id, email, login, true));
//                     } 
//             });
// }

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me()
    
    if (meData.resultCode === ResultCodesEnum.Success) {
        let { id, login, email } = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true))
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

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha)
        
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        // why it noy work ResultCodeForCaptchaEnum.CaptchaIsRequired
        if (data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', { _error: message }))
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

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
                
}

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout()
       
            if (response.data.resultCode === 0) {
                dispatch(actions.setAuthUserData(null, null, null, false))
            }        
}

export default authReducer
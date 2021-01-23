import { PhotosType, PostType, ProfileType } from './../types/types'
import { FormAction, stopSubmit } from "redux-form"
import { profileAPI } from '../api/profile-api'
import { BaseThunkType, InferActionsTypes } from './redux-store'


// const ADD_POST = 'R/PROFILE/ADD-POST'
// const SET_USER_PROFILE = 'R/PROFILE/SET_USER_PROFILE'
// const SET_STATUS = 'R/PROFILE/SET_STATUS'
// const DELETE_POST = 'R/PROFILE/DELETE_POST'
// const SAVE_PHOTO_SUCCESS = 'R/PROFILE/SAVE_PHOTO_SUCCESS'



let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: "It's my first post", likesCount: 45},  
        {id: 2, message: "blabla", likesCount: 45},  
        {id: 4, message: "dada", likesCount: 45}  
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ""
  }

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'R/PROFILE/ADD-POST': {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
                };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        }
        
        case 'R/PROFILE/SET_STATUS': {
            return {
                ...state,
                status: action.status
            }; 
        }
        case 'R/PROFILE/SET_USER_PROFILE': {
            return { 
                ...state, 
                profile: action.profile
            }
        }
        case 'R/PROFILE/DELETE_POST':
            return {...state, posts: state.posts.filter(p => p.id != action.postId )}

        case 'R/PROFILE/SAVE_PHOTO_SUCCESS':
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType }
        default:
            return state;
    }       
}

export const actions ={
    addPostActionCreator: (newPostText: string) => ({type: 'R/PROFILE/ADD-POST', newPostText } as const),
    setUserProfile: (profile: ProfileType) => ({type: 'R/PROFILE/SET_USER_PROFILE', profile } as const),
    setStatus: (status: string) => ({type: 'R/PROFILE/SET_STATUS', status } as const),
    deletePost: (postId: number) => ({type: 'R/PROFILE/DELETE_POST', postId } as const),
    savePhotoSuccess: (photos: PhotosType)  => ({type: 'R/PROFILE/SAVE_PHOTO_SUCCESS', photos } as const)
}


export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
        dispatch(actions.setUserProfile(data))    
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
       
            dispatch(actions.setStatus(data))    
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try{
        let data = await profileAPI.updateStatus(status)
      
        if(data.resultCode === 0){
                dispatch(actions.setStatus(status))
        }
    } catch(error) {

    }         
  
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
      
    if(data.resultCode === 0){
        dispatch(actions.savePhotoSuccess(data.data.photos)) 
    }         
  
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)
      
    if(data.resultCode === 0){
        if (userId != null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error("userId can't be null")
        }
        
    }   else {
        dispatch(stopSubmit('edit-profile' ,{_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
        
        //dispatch(stopSubmit('edit-profile' , {'contacts': {'facebook': response.data.messages[0]} }))
    }      
  
}

export default profileReducer

export type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType | FormAction>

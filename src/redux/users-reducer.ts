import { AppStateType, BaseThunkType, InferActionsTypes } from './redux-store'
import { UserType } from './../types/types'
import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { usersAPI } from '../api/users-api'


// const FOLLOW = 'R/USERS/FOLLOW'
// const UNFOLLOW = 'R/USERS/UNFOLLOW'
// const SET_USERS = 'R/USERS/SET_USERS'
// const SET_CURRENT_PAGE = 'R/USERS/SET_CURRENT_PAGE'
// const SET_TOTAL_USERS_COUNT = 'R/USERS/SET_TOTAL_USERS_COUNT'
// const TOGGLE_IS_FETCHING = 'R/USERS/TOGGLE_IS_FETCHING'
// const TOGGLE_IS_FOLLOWING_PROGRESS = 'R/USERS/TOGGLE_IS_FOLLOWING_PROGRESS'


let initialState = {
    users: [ ] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> // array of users id
}



const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'R/USERS/FOLLOW':
            return { 
                ...state,
                users: state.users.map( u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }

        case 'R/USERS/UNFOLLOW':
            return { 
                ...state,
                users: state.users.map( u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case 'R/USERS/SET_USERS':{
            return { ...state, users: action.users }
        }   
        case 'R/USERS/SET_CURRENT_PAGE':{
            return { ...state, currentPage: action.currentPage }
        }
        case 'R/USERS/SET_TOTAL_USERS_COUNT':{
            return { ...state, totalUsersCount: action.count}
        } 
        
        case 'R/USERS/TOGGLE_IS_FETCHING':{
            return { ...state, isFetching: action.isFetching}
        } 

        case 'R/USERS/TOGGLE_IS_FOLLOWING_PROGRESS':{
            return { 
                ...state,
                followingInProgress: action.isFetching 
                ? [ ...state.followingInProgress, action.userId] 
                : state.followingInProgress.filter(id => id !== action.userId)
            }
        }

        default:
            return state;
    }       
}

export const actions = {
    followSuccess: (userId: number) => ({type: 'R/USERS/FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({type: 'R/USERS/UNFOLLOW', userId } as const),
    setUsers: (users: Array<UserType>) => ({type: 'R/USERS/SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({type: 'R/USERS/SET_CURRENT_PAGE', currentPage } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'R/USERS/SET_TOTAL_USERS_COUNT', count: totalUsersCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'R/USERS/TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({type: 'R/USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)
}


export const requestUsers = (currentPage: number, pageSize: number ): ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => {

    return async ( dispatch, getStste) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(currentPage))
       
        let data = await usersAPI.getUsers(currentPage, pageSize)
            
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
            
    }
}

export const follow = (userId: number ): ThunkType => {
    return  async ( dispatch) => {
        dispatch(actions.toggleFollowingProgress(true, userId))
        let data = await usersAPI.follow(userId)
            
            if (data.resultCode === 0) {
                dispatch(actions.followSuccess(userId))
        }
            dispatch(actions.toggleFollowingProgress(false, userId))
                                                   
    }
}

export const unfollow = (userId: number ): ThunkType => {
    return async ( dispatch) => {
        dispatch(actions.toggleFollowingProgress(true, userId))
        let data = await usersAPI.unfollow(userId)
            
                if (data.resultCode === 0) {
                    dispatch(actions.unfollowSuccess(userId))
                };
                dispatch(actions.toggleFollowingProgress(false, userId))
                                        
           
    }
}

export default usersReducer

type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsTypes>
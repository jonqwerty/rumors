import { AppStateType } from './redux-store';
import { UserType } from './../types/types';
import { usersAPI } from "../api/api";
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';



let initialState = {
    users: [ ] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> // array of users id
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case FOLLOW:
            return { 
                ... state,
                users: state.users.map( u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }

        case UNFOLLOW:
            return { 
                ... state,
                users: state.users.map( u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS:{
            return { ...state, users: action.users }
        }   
        case SET_CURRENT_PAGE:{
            return { ...state, currentPage: action.currentPage }
        }
        case SET_TOTAL_USERS_COUNT:{
            return { ...state, totalUsersCount: action.count}
        } 
        
        case TOGGLE_IS_FETCHING:{
            return { ...state, isFetching: action.isFetching}
        } 

        case TOGGLE_IS_FOLLOWING_PROGRESS:{
            return { 
                ...state,
                followingInProgress: action.isFetching 
                ? [ ...state.followingInProgress, action.userId] 
                : state.followingInProgress.filter(id => id != action.userId)
            }
        }

        default:
            return state;
    }       
}

type ActionsTypes = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType |
                    SetCurrentPageActionType | SetTotalUsersCountActionType | ToggleIsFetchingActionType | ToggleFollowingProgressActionType

type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({type: FOLLOW, userId })

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({type: UNFOLLOW, userId })

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users })

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage })

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching })

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })


type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>

type Thunktype = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (currentPage: number, pageSize: number ): ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => {

    return async ( dispatch, getStste) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(currentPage));
       
        let data = await usersAPI.getUsers(currentPage, pageSize)
            
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
            
    }
}

export const follow = (userId: number ): Thunktype => {
    return  async ( dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        let response = await usersAPI.follow(userId)
            
            if (response.data.resultCode == 0) {
                dispatch(followSuccess(userId));
        };
            dispatch(toggleFollowingProgress(false, userId));
                                                   
    }
}

export const unfollow = (userId: number ): Thunktype => {
    return async ( dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        let response = await usersAPI.unfollow(userId)
            
                if (response.data.resultCode == 0) {
                    dispatch(unfollowSuccess(userId));
                };
                dispatch(toggleFollowingProgress(false, userId));
                                        
           
    }
}

export default usersReducer;
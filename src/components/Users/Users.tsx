import React, { FC } from 'react'
import styles from './Users.module.css'

import Paginator from '../common/Paginator/Paginator'
import User from './User'
import { UserType } from '../../types/types'
import { FilterType } from '../../redux/users-reducer'
import { UsersSearchForm } from './UsersSearchForm'


type PropsType = {
    currentPage: number 
    onPageChanged: (pageNumber: number) => void 
    onFilterChanged: (filter: FilterType) => void 
    totalUsersCount: number 
    pageSize: number
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    

}


let Users: FC<PropsType> = ({currentPage, 
                            onPageChanged, 
                            totalUsersCount, 
                            pageSize, 
                            users, 
                            ...props}) => {

    return <div>

        < UsersSearchForm onFilterChanged = {props.onFilterChanged}  />
       
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged} 
                    totalUsersCount={totalUsersCount} pageSize={pageSize} />
        <div>
        {
            users.map(u => <User user={u}
                                followingInProgress={props.followingInProgress}
                                key={u.id}
                                unfollow={props.unfollow}
                                follow={props.follow} />)
                
        }
        </div>
    </div>
}



export default Users
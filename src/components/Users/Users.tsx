import React, { FC } from 'react';
import styles from './Users.module.css';

import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { UserType } from '../../types/types';

type PropsType = {
    currentPage: number 
    onPageChanged: (pageNumber: number) => void 
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

export default Users;
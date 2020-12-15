import React from 'react';
import styles from './Users.module.css';

import Paginator from '../common/Paginator/Paginator';
import User from './User';


let Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props}) => {

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
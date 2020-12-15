import React from 'react';
import styles from './Users.module.css';
import userPhoto from './../../assets/images/default_image.png'
import { NavLink } from 'react-router-dom';



let User = ({user, followingInProgress, unfollow, follow}) => {
    let u = user
    return( 
       
        <div >
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id} >
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto} />
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {unfollow(u.id)}}>
                                Unfollow</button>
                            : <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {follow(u.id)}}>Follow</button>}

                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                </span>
            </div>)
      
}

export default User;
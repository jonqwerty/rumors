import React from 'react';
import styles from './Users.module.css';

let Users = (props) => {

    if (props.users.length === 0) {
    props.setUsers( [
        {id: 1, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO2pG4LmrRGPh-6htiEVO7q0KsgZSA-bqJKQ&usqp=CAU', followed: false, fullName: 'Dima', status: 'I am a boss', location: {city: 'Moscow', country: 'Russia'}},
        {id: 2, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO2pG4LmrRGPh-6htiEVO7q0KsgZSA-bqJKQ&usqp=CAU', followed: false, fullName: 'Anton', status: 'I am a boss too', location: {city: 'Kiev', country: 'Ukraine'}},
        {id: 3, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO2pG4LmrRGPh-6htiEVO7q0KsgZSA-bqJKQ&usqp=CAU', followed: true, fullName: 'Sasha', status: 'I am a boss too', location: {city: 'Minsk', country: 'Belarus'}},
        ]
        )
    }
    
    return <div>
        {
            props.users.map( u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photoUrl} className={styles.userPhoto}/>
                    </div>
                    <div>
                        { u.followed 
                        ? <button onClick={() => {props.unfollow(u.id)}}>Unfollow</button> : <button onClick={() => {props.follow(u.id)}}>Follow</button> }
                        
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users;
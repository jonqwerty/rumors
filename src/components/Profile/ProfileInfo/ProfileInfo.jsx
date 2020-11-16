
import React from 'react';
import s from'./ProfileInfo.module.css';
import w from './profile_top.jpg'
const ProfileInfo = () => {
    return (
        <div className={s.topImage}>
            <div >
                <img src= {w}/>
            </div>
            <div className={s.descriptionBlock}>
                ava = descrption
            </div>
            
        </div>
    )
}

export default ProfileInfo;
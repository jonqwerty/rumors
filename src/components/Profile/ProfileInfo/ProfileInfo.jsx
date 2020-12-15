
import React from 'react';
import s from'./ProfileInfo.module.css';
import w from './profile_top.jpg'
import ProfileStatus from './ProfileStatus';
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatusWithHooks from './ProfileStatusWithHooks';


const ProfileInfo = ({profile, status, updateStatus}) => {
    if (!profile){
        return <Preloader />
    }

    return (
        <div className={s.topImage}>
           
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large}/>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
            
        </div>
    )
}

export default ProfileInfo;
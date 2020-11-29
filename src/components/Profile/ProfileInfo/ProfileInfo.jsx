
import React from 'react';
import s from'./ProfileInfo.module.css';
import w from './profile_top.jpg'
import ProfileStatus from './ProfileStatus';
import Preloader from '../../common/Preloader/Preloader'


const ProfileInfo = (props) => {
    if (!props.profile){
        return <Preloader />
    }

    return (
        <div className={s.topImage}>
            {/* <div >
                <img src= {w}/>
            </div> */}
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            </div>
            
        </div>
    )
}

export default ProfileInfo;
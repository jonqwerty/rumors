
import React from 'react';
import s from'./ProfileInfo.module.css';
import w from './profile_top.jpg'
import ProfileStatus from './ProfileStatus';
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from './../../../assets/images/default_image.png';


const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}) => {
    if (!profile){
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div className={s.topImage}>
           
            <div className={s.descriptionBlock}>
                <img src={ profile.photos.large || userPhoto } className={s.mainPhoto}/>
                { isOwner && <input type={'file'} onChange={onMainPhotoSelected} /> }
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
            
        </div>
    )
}

export default ProfileInfo;
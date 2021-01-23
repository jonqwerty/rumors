import React from 'react'
import { ProfileType } from '../../types/types'
import Preloader from '../common/Preloader/Preloader'
import MyPosts from './MyPosts/MyPosts'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import s from'./Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}


const Profile: React.FC<PropsType> = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    
    return (
        <div >
            <ProfileInfo savePhoto={props.savePhoto} 
            isOwner={props.isOwner} 
            profile={props.profile} 
            status={props.status} 
            updateStatus={props.updateStatus}
            saveProfile={props.saveProfile} />
            
            <MyPostsContainer  />
        </div>
    )
}

export default Profile
import React from 'react';
import Preloader from '../common/Preloader/Preloader';
import MyPosts from './MyPosts/MyPosts';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import s from'./Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';



const Profile = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    
    return (
        <div >
            <ProfileInfo profile={props.profile} />
            
            <MyPostsContainer  />
        </div>
    );
}

export default Profile;
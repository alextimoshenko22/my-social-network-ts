import React from 'react';
/*import style from './Profile.module.css';*/
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './../Profile/MyPosts/MyPostsContainer';

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo isOwner={props.isOwner} 
            profile={props.profile} 
            status={props.status} 
            updateStatus={props.updateStatus}
            savePhoto={props.savePhoto} 
            saveProfile={props.saveProfile} />
            <MyPostsContainer />
        </div>
    );
}

export default Profile;
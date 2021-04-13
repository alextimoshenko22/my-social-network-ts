import React, { useState } from 'react';
import style from './ProfileInfo.module.css';
import Preloader from './../../common/Preloader/Preloader';
import userPhoto from './../../../assets/images/images.png'
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false);

    const goToEditMode = () => {
        setEditMode(true);
    }

    if(!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if(e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        saveProfile(formData).then(() => {
            setEditMode(false);
        })
    }

    return (
        <div>
            <div className={style.descriptionBlock}>
                <label>
                    <img src={profile.photos.large || userPhoto} alt='ava' className={style.mainPhoto} title="Upload image" />
                    {isOwner && <input type="file" onChange={onMainPhotoSelected} className={style.fileInput} hidden />}
                </label>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
                {editMode 
                    ? <ProfileDataForm profile={profile} onSubmit={onSubmit} />
                    : <ProfileData initialValues={profile} profile={profile} isOwner={isOwner} goToEditMode={goToEditMode} />}
            </div>
        </div>
    );
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return (
        <div>
            {isOwner && 
            <div>
                <button onClick={goToEditMode}>Edit</button>
            </div>
            }               
            <div>
                <b>Full Name</b>: {profile.fullName}
            </div>
            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
            </div>
            { profile.lookingForAJob &&
                <div>
                    <b>My professional skills</b>: {profile.lookingForAJobDescription}
                </div>
            }
            <div>
                <b>About me</b>: {profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                })}
            </div>
        </div>
    )
}

const Contact = ({contactTitle, contactValue}) => {
    return <div className={style.contact} >
        <b>{contactTitle}</b>: {contactValue}
    </div>
}

export default ProfileInfo;

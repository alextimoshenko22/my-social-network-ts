import React from 'react'
import { required } from "../../../utils/validators/validators";
import { Form, Field } from "react-final-form";
import Input from '../../common/formsControls/FormsControls';
import Textarea from '../../common/formsControls/FormsControls';

const ProfileDataForm = ({profile, onSubmit}) => {

    return <Form onSubmit={onSubmit}>
        {
            ({ handleSubmit }) => {
                return <form onSubmit={handleSubmit}>
                    <div>
                        <button>Save</button>
                    </div>
                    <div>
                        <b>Full Name</b>: <Field component={Input} name={"fullName"} validate={required} placeholder={"Full name"} />
                    </div>
                    <div>
                        <b>Looking for a job</b>: <Field component={Input} type={"checkbox"} name={"lookingForAJob"} />
                    </div>
                    <div>
                        <b>My professional skills</b>: <Field component={Textarea} name={"lookingForAJobDescription"} placeholder={"My professional skills"} />
                    </div>
                    <div>
                        <b>About me</b>: <Field component={Textarea} name={"aboutMe"} placeholder={"About me"} />
                    </div>
                    <div>
                        <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                            return <div key={key} className={styleMedia.contact}>
                                <b>{key}</b>: <Field component={Input} name={"contacts." + key} placeholder={key} />
                            </div>
                        })}
                    </div>
                </form>
            }
        }
    </Form>
}

export default ProfileDataForm;
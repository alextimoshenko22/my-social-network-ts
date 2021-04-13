import React from 'react';
import style from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import Textarea from '../common/formsControls/FormsControls';
import { maxLengthCreator, required, composeValidators } from '../../utils/validators/validators';
import { Form, Field } from "react-final-form";

const maxLength = maxLengthCreator(10);

const Dialogs = (props) => {
    let state = props.dialogsPage;
    
    let dialogsElements = state.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name} />);
    let messagesElements = state.messages.map(m => <Message key={m.id} message={m.message} />);

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    }
    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                { dialogsElements }
            </div>
            <div className={style.messages}>
                <div>{ messagesElements }</div>
                <AddMessageForm onSubmit={addNewMessage} />
            </div>
        </div>
    )
}

const AddMessageForm = (props) => { 
    return <Form onSubmit={props.onSubmit}>
    {
        ({ handleSubmit, form }) => {
            const resetForm = async (e) => {
                await handleSubmit(e);
                form.reset();
                form.resetFieldState('newMessageBody');
            }
            return <form onSubmit={resetForm}>
                <Field component={Textarea} name={"newMessageBody"} validate={composeValidators(required, maxLength)} placeholder={"Enter your message"} />
                <div>
                    <button>Send</button>
                </div>
            </form>
        }
    }
    </Form>
}

export default Dialogs;
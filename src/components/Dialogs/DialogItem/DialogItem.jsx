import React from 'react'
import style from '../Dialogs.module.css'
import { NavLink } from "react-router-dom"

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id;
    return (
        <div>
            <NavLink className={style.dialog} activeStyle={{ color: 'red' }} to={path}>{props.name}</NavLink>
        </div>
    );
}

export default DialogItem;
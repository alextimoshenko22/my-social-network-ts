import React from 'react'
import style from './Friends.module.css'
import { NavLink } from "react-router-dom";

const Friends = (props) => {

    let path = "/friends/" + props.id;
    return (
        <div className={style.friend + ' ' + style.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    );
}

export default Friends;
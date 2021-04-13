import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Header.module.css'

const Header = (props) => {
    return (
        <header className={style.header}>
            My Social Network
            <div className={style.loginBlock}>
                { props.isAuth 
                    ? <div>{props.login} - <button onClick={props.logout}>Logout</button></div> 
                    : <NavLink to={'/login'}>Login</NavLink> } 
            </div>
        </header>
    );
}

export default Header;
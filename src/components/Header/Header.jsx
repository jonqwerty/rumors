
import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';


const Header = (props) => {
    
    return (
        <header className={s.header}>
        
            <div>
            <img src='https://webstockreview.net/images/clipart-ear-science-sound-1.png' />
            </div>
            <div className={s.item}>
                <p>RUMORS</p>
            </div>
            <div className={s.loginBlock} >
                { props.isAuth ? props.login
                    : <NavLink to={'/login'}>Login</NavLink> }
            </div>
                   
           
        </header>
    );
}

export default Header;
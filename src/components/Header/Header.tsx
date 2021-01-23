
import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Header.module.css'

export type MapPropsType = {
    isAuth: boolean
    login: string | null
}

export type DispatchPropsType = {
    logout: () => void
}


const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    
    return (
        <header className={s.header}>
        
            <div>
            <img src='https://webstockreview.net/images/clipart-ear-science-sound-1.png' />
            </div>
            <div className={s.item}>
                <p>RUMORS</p>
            </div>
            <div className={s.loginBlock} >
                { props.isAuth 
                    ? <div><div className = {s.nick}>{props.login}</div> <button onClick={props.logout}> Log out </button></div>
                    : <NavLink to={'/login'}>Login</NavLink> }
            </div>
                   
           
        </header>
    )
}

export default Header
import s from './Header.module.css';
const Header = () => {
    return (
        <header className={s.header}>
        
            <div>
            <img src='https://webstockreview.net/images/clipart-ear-science-sound-1.png' />
            </div>
            <div className={s.item}>
                <p>RUMORS</p>
            </div>
                   
           
        </header>
    );
}

export default Header;
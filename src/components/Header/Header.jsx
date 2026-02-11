import {NavLink, Link} from 'react-router';
import styles from './Header.module.css';

const Header = ({name}) => {
    return (
        <header className={styles.header}>
            <div className="logo">
                <Link to="/" className={styles.logoLink}>
                <h2 className={styles.logoText}>{name}</h2>
                </Link>
            </div>
            <nav>
                <ul>
                    <li className={styles.navListItem}>
                    <NavLink to="/" className={({isActive}) =>
                    isActive ? `${styles.link} ${styles.active}` : styles.link} end>Person list</NavLink>
                    </li>
                    <li className={styles.navListItem}>
                    <NavLink to="/add" className={({isActive}) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Add employee</NavLink>
                    </li>
                    <li className={styles.navListItem}>
                    <NavLink to="/about" className={({isActive}) =>
                    isActive ? `${styles.link} ${styles.active}` :
                    styles.link}>About</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
import {NavLink, Link} from 'react-router';
import './Header.css';

const Header = ({name}) => {
    return (
        <header>
            <div className="logo">
                <Link to="/">
                <h2>{name}</h2>
                </Link>
            </div>
            <nav>
                <ul>
                    <NavLink to="/">Person list</NavLink>
                    <NavLink to="/add">Add employee</NavLink>
                    <NavLink to="/about">About</NavLink>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
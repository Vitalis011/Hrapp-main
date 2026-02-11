import {Link} from 'react-router-dom';
import './Header.css';

const Header = ({name}) => {
    return (
        <header>
            <div>
                <Link to="/">
                <h2>{name}</h2>
                </Link>
            </div>
            <nav>
                <ul>
                    <Link to="/about">About</Link>
                    <Link to="/persons">Person List</Link>
                    <Link to="/add">Add Employee</Link>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
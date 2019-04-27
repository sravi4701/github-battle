const React = require('react');
const NavLink = require('react-router-dom').NavLink;

function NavBar(props) {
    return (
        <ul className="nav">
            <li>
                <NavLink exact activeClassName="active" to="/">Home</NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/popular">Popular</NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/battle">Battle</NavLink>
            </li>
        </ul>
    )
}

module.exports = NavBar;

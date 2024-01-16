import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header flex items-center justify-center gap-x-5 text-white py-10 text-2xl">
            <NavLink to='/' className={({ isActive }) => (isActive ? 'text-primary' : '')}>Home</NavLink>
            <NavLink to='/movies/now_playing' className={({ isActive }) => (isActive ? 'text-primary' : '')}>Now playing</NavLink>
            <NavLink to='/movies/popular' className={({ isActive }) => (isActive ? 'text-primary' : '')}>Popular</NavLink>
            <NavLink to='/movies/top_rated' className={({ isActive }) => (isActive ? 'text-primary' : '')}>Top rated</NavLink>
        </header>
    );
};

export default Header;
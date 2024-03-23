import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
const Nav = ({setIsLogin}) => {
    const handleLogout = ()=>{
        localStorage.clear();
        setIsLogin(false);
    }
  return (
    <header className='navbar'>
        <div className='logo'>
            <h1><Link to='/'>Dev Notes</Link></h1>
        </div>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/create'>Create</Link></li>
            <li onClick={handleLogout}><Link to='/logout'>Logout</Link></li>
        </ul>
    </header>
  )
}

export default Nav
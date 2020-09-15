import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({ user, handleLogout }) => {
    return (
        <div className='navbar' style={{background:'lightgray', padding:'10px', margin:'5px'}}>
            <span style={{marginLeft:'10px'}}><NavLink to='/'>blogs</NavLink></span>
            <span style={{marginLeft:'10px'}}><NavLink to='/users'>users</NavLink></span>
            <span style={{marginLeft:'10px'}}>{user.username} Logged in</span>
            <button style={{marginLeft:'10px'}} onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Navbar

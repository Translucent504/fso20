import React from 'react'
import { NavLink } from 'react-router-dom'
import { AppBar, Button,Toolbar } from '@material-ui/core'

const Navbar = ({ user, handleLogout }) => {
    return (
        user &&
        <div className='navbar' style={{ background: 'lightgray', padding: '10px', margin: '5px' }}>
            <AppBar position="static">
                <Toolbar>


                    <Button color="inherit" component={NavLink} to='/'>blogs</Button>
                    <Button color="inherit" component={NavLink} to='/users'>users</Button>
                    <Button color="inherit" to='/users' onClick={handleLogout}>Logout</Button>

                </Toolbar>
            </AppBar>

        </div>
    )
}

export default Navbar

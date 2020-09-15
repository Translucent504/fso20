import React, { useEffect, useState } from 'react'
import userService from '../services/users'

const UsersTable = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        userService.getAll()
            .then(data => setUsers(data))
    }, [])
    return (
        <>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th colSpan="1">User</th>
                        <th colSpan="1">Blogs Created</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default UsersTable

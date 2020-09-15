import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeUsers } from '../reducers/allUsersReducer'

const UsersTable = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    const users = useSelector(state => state.users)
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
                                <td><Link to={user.id}>{user.name}</Link></td>
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

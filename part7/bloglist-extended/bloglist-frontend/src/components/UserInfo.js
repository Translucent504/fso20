import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

const UserInfo = () => {
    const id = useParams().id
    const user = useSelector(state => state.users.find(user => user.id === id))
    return (
        <>
        <h1>
            {user?.name}
        </h1>
        <h2>Added Blogs</h2>
        {user?.blogs?.map(blog => <li key={blog.id}><Link to={`/blogs/${blog.id}`} >{blog.title}</Link></li>)}
        </>
    )
}

export default UserInfo

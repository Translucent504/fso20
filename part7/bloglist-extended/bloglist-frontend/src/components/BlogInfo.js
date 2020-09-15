import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog } from '../reducers/blogReducer'


const BlogInfo = () => {
    const dispatch = useDispatch()
    const id = useParams().id
    const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
    const handleLike = () => {
        dispatch(likeBlog(blog))
    }
    
    return (
        <>
            <h1>{blog?.title}</h1>
            <a href={`${blog?.url}`}>{blog?.url}</a>
            <span>likes {blog?.likes} <button onClick={() => handleLike()}>Like</button></span>
            <p>added By {blog?.user.username}</p>
        </>
    )
}

export default BlogInfo

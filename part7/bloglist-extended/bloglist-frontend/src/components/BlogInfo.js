import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog, commentBlog } from '../reducers/blogReducer'


const BlogInfo = () => {
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const id = useParams().id
    const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
    const handleLike = () => {
        dispatch(likeBlog(blog))
    }

    const handleComment = () => {
        dispatch(commentBlog({
            id,
            comment
        }))
        setComment('')
    }


    return (
        <>
            <h1>{blog?.title}</h1>
            <a href={`${blog?.url}`}>{blog?.url}</a>
            <span>likes {blog?.likes} <button onClick={() => handleLike()}>Like</button></span>
            <p>added By {blog?.user.username}</p>
            <h2>Comments</h2>

            <input onChange={({ target }) => setComment(target.value)} value={comment} type='text' placeholder='Comment...'></input>
            <button onClick={handleComment}>add a comment</button>
            <br />
            {blog?.comments?.map((comment, index) => <li key={index}>{comment}</li>)}
        </>
    )
}

export default BlogInfo

import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleBlogUpdate, user }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [owner, setOwner] = useState(false)

  useEffect(() => {
    console.log('firing')
    if (blog.user.username === user.username) {
      setOwner(true)
    } else {
      setOwner(false)
    }
  }, [blog.user.username, user.username])

  const showWhenOwner = {
    display: owner ? '' : 'none',
    backgroundColor: 'red'
  }

  const handleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = async () => {
    await blogService.likeBlog(blog)
    handleBlogUpdate()
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteBlog(blog)
      handleBlogUpdate()
    }
  }

  return (
    <div>
      {blog.title} {blog.author} <button onClick={handleShowDetails}>{showDetails ? 'Hide Details' : 'View Details'}</button>
      <div style={{ display: showDetails ? '' : 'none' }}>
        <ul style={{ 'listStyle': 'none' }}>
          <li>{blog.url}</li>
          <li>Likes: {blog.likes} <button onClick={handleLike}>like</button></li>
          <li>{blog.user.name}</li>
          <button onClick={handleDelete} style={showWhenOwner}>Delete</button>
        </ul>
      </div>
    </div>
  )
}


export default Blog

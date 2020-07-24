import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleBlogUpdate, user }) => {
  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleBlogUpdate: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  const [showDetails, setShowDetails] = useState(false)
  const [owner, setOwner] = useState(false)

  useEffect(() => {
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
    handleBlogUpdate() 
    // with this ordering it will show the UI to update before the server has actually updated.
    await blogService.likeBlog(blog)
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteBlog(blog)
      handleBlogUpdate()
    }
  }

  return (
    <div className="blogDiv">
      {blog.title} {blog.author} <button onClick={handleShowDetails}>{showDetails ? 'Hide Details' : 'View Details'}</button>
      <div className="blogDetails" style={{ display: showDetails ? '' : 'none' }}>
        <ul style={{ 'listStyle': 'none' }}>
          <li>{blog.url}</li>
          <li>Likes: {blog.likes} <button className='likeButton' onClick={handleLike}>like</button></li>
          <li>{blog.user.name}</li>
          <button onClick={handleDelete} style={showWhenOwner}>Delete</button>
        </ul>
      </div>
    </div>
  )
}


export default Blog

import React,{useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleBlogUpdate }) => {
const [showDetails, setShowDetails] = useState(false)

  const handleShowDetails = () => {
    setShowDetails(!showDetails)
  }
  
  const handleLike = async () => {
    await blogService.likeBlog(blog)
    handleBlogUpdate()
  }

  return (
    <div>
      {blog.title} {blog.author} <button onClick={handleShowDetails}>{showDetails ? 'Hide Details' : 'View Details'}</button>
      <div style={{display: showDetails ? '':'none'}}>
        <ul>
          <li>{blog.url}</li>
          <li>Likes: {blog.likes} <button onClick={handleLike}>like</button></li>
          <li>{blog.user.name}</li>
        </ul>
      </div>
    </div>
  )
}


export default Blog

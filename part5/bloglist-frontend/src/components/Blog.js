import React,{useState} from 'react'

const Blog = ({ blog }) => {
const [showDetails, setShowDetails] = useState(false)

  const handleShowDetails = () => {
    setShowDetails(!showDetails)
  }
  
  return (
    <div>
      {blog.title} {blog.author} <button onClick={handleShowDetails}>{showDetails ? 'Hide Details' : 'View Details'}</button>
      <div style={{display: showDetails ? '':'none'}}>
        <ul>
          <li>{blog.url}</li>
          <li>Likes: {blog.likes} <button>like</button></li>
          <li>{blog.user.name}</li>
        </ul>
      </div>
    </div>
  )
}


export default Blog

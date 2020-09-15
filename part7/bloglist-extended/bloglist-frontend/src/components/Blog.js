import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
  }

  return (
    <div className="blogDiv">
      <p><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></p>
    </div>
  )
}


export default Blog

import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (blog) => {
  // assuming that the blog is an object of the form {url, author, title}
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

const likeBlog = async (blog) => {
  const requestObject = {
    user: blog.user.id,
    likes: blog.likes + 1,
    title: blog.title,
    author: blog.author,
    url: blog.url
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, requestObject)
  return response.data
}

export default { getAll, create, setToken, likeBlog, deleteBlog }
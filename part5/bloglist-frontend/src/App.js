import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const blogToggleRef = useRef()

  useEffect(() => {
    const storedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (storedUserJSON) {
      const user = JSON.parse(storedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({
        username,
        password
      })
      if (loggedUser) {
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(loggedUser))
        setUser(loggedUser)
        blogService.setToken(loggedUser.token)
        setUsername('')
        setPassword('')
      }
      setNotification('Successfully logged in')
      setTimeout(() => {
        setNotification(null)
      }, 5000)

    } catch (error) {
      setErrorMsg('Invalid username or password')
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)

    }
  }

  const loginForm = () => (
    <form id="loginForm" onSubmit={handleLogin}>
      <div>
        Username:<input id="username" type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        Password:<input id="password" type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button id="loginButton" type="submit">Login</button>
    </form>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setNotification('Successfully logged out')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    setUser(null)
  }

  const handleBlogCreate = async (Blog) => {
    const newBlog = Blog
    blogToggleRef.current.toggleVisible()
    try {
      const response = await blogService.create(newBlog)
      console.log(response)
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
      setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (error) {
      console.log('invalid blog?')
      setErrorMsg(`Cant create Blog: ${error}`)
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }

  const handleBlogUpdate = async () => {
    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs)
  }

  return (
    <div id="main">
      <h2>blogs</h2>
      {notification && <h2 id="notification" style={{ background: 'aquamarine', border: 'green solid 2px', color: 'green' }}>{notification}</h2>}
      {errorMsg && <h2 id="error" style={{ border: 'red solid 2px', color: 'red' }} >{errorMsg}</h2>}
      {!user
        ? loginForm()
        : <div>
          <p>{user.username} Logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <div>
            <Toggleable buttonLabel='Create New Blog' ref={blogToggleRef}>
              <BlogForm handleBlogCreate={handleBlogCreate} />
            </Toggleable>
            {
              blogs
                .sort((b1, b2) => b2.likes - b1.likes)
                .map(blog =>
                  <Blog user={user} handleBlogUpdate={handleBlogUpdate} key={blog.id} blog={blog} />
                )
            }
          </div>
        </div>
      }

    </div>
  )
}

export default App
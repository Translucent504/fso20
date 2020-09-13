import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import { notify } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { showError } from './reducers/errorReducer'
import { createBlog, refreshBlogs } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogToggleRef = useRef()
  const notification = useSelector(state => state.notification.message)
  const blogs = useSelector(state => state.blogs)
  const errorMsg = useSelector(state => state.error.message)
  const dispatch = useDispatch()

  useEffect(() => {
    const storedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (storedUserJSON) {
      const user = JSON.parse(storedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(refreshBlogs())
  }, [dispatch])

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
      dispatch(notify('Successfully logged in'))

    } catch (error) {
      dispatch(showError('Invalid username or password'))
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
    dispatch(notify('Successfully logged out'))
    setUser(null)
  }

  const handleBlogCreate = async (Blog) => {
    blogToggleRef.current.toggleVisible()
    try {
      const newBlog = await blogService.create(Blog)
      dispatch(createBlog(newBlog))
      dispatch(notify(`a new blog ${newBlog.title} by ${newBlog.author} added`))
    } catch (error) {
      console.log('invalid blog?')
      dispatch(showError(`Cant create Blog: ${error}`))
    }
  }

  const handleBlogUpdate = () => {
    dispatch(refreshBlogs())
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
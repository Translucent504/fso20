import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import { notify } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { showError } from './reducers/errorReducer'
import { createBlog, refreshBlogs } from './reducers/blogReducer'
import { initializeUser, loginUser, logoutUser } from './reducers/userReducer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UsersTable from './components/UsersTable'
import UserInfo from './components/UserInfo'
import BlogInfo from './components/BlogInfo'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogToggleRef = useRef()
  const notification = useSelector(state => state.notification.message)
  const blogs = useSelector(state => state.blogs)
  const errorMsg = useSelector(state => state.error.message)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(refreshBlogs())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password))
    setUsername('')
    setPassword('')
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
    dispatch(logoutUser())
    dispatch(notify('Successfully logged out'))
  }

  const handleBlogCreate = async (Blog) => {
    blogToggleRef.current.toggleVisible()
    try {
      const newBlog = await blogService.create(Blog)
      dispatch(createBlog(newBlog))
      dispatch(notify(`a new blog ${newBlog.title} by ${newBlog.author} added`))
    } catch (error) {
      dispatch(showError(`Cant create Blog: ${error}`))
    }
  }

  return (
    <div id="main">
      <Router>
        <h2>blogs</h2>
        {notification && <h2 id="notification" style={{ background: 'aquamarine', border: 'green solid 2px', color: 'green' }}>{notification}</h2>}
        {errorMsg && <h2 id="error" style={{ border: 'red solid 2px', color: 'red' }} >{errorMsg}</h2>}
        {!user
          ? loginForm()
          : <div>
            <p>{user.username} Logged in</p>
            <button onClick={handleLogout}>Logout</button>
            <Routes>
              <Route path='/'>
                <div>
                  <Toggleable buttonLabel='Create New Blog' ref={blogToggleRef}>
                    <BlogForm handleBlogCreate={handleBlogCreate} />
                  </Toggleable>
                  {
                    blogs
                      .sort((b1, b2) => b2.likes - b1.likes)
                      .map(blog =>
                        <Blog key={blog.id} blog={blog} />
                      )
                  }
                </div>
              </Route>
              <Route path='users' element={<UsersTable />} />
              <Route path='users/:id' element={<UserInfo />} />
              <Route path='blogs/:id' element={<BlogInfo />} />
            </Routes>
          </div>
        }
      </Router>
    </div>
  )
}

export default App
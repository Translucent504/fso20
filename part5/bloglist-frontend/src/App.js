import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (storedUserJSON) {
      const user = JSON.parse(storedUserJSON)
      setUser(user)
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
        setUsername('')
        setPassword('')
      }

    } catch (error) {
      console.log("Invalid credentials")
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      Username:<input type="text" value={username} onChange={({ target }) => setUsername(target.value)} /><br />
      Password:<input type="password" value={password} onChange={({ target }) => setPassword(target.value)} /><br />
      <button type="submit">Login</button>
    </form>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }


  return (
    <div>
      <h2>blogs</h2>
      {!user
        ? loginForm()
        : <div>
          <p>{user.username} Logged in</p>
          <button onClick={handleLogout}>Logout</button>
          {
            blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )
          }
        </div>
      }

    </div>
  )
}

export default App
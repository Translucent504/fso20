import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

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
      setNotification(`Successfully logged in`)
      setTimeout(() => {
        setNotification(null)
      }, 5000);

    } catch (error) {
      setErrorMsg(`Invalid username or password`)
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000);
      
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username:<input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        Password:<input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setNotification(`Successfully logged out`)
    setTimeout(() => {
      setNotification(null)
    }, 5000);
    setUser(null)
  }

  const handleBlogCreate = async (event) => {
    event.preventDefault()
    const newBlog = { title, author, url }
    try {
      const response = await blogService.create(newBlog)
      console.log(response)
      setBlogs([...blogs, response])
      setAuthor('')
      setUrl('')
      setTitle('')
      setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000);
    } catch (error) {
      console.log('invalid blog?')
      setErrorMsg(`Cant create Blog: ${error}`)
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000);
      setAuthor('')
      setUrl('')
      setTitle('')
    }
  }

  const blogForm = () => (
    <form onSubmit={handleBlogCreate}>
      <div>
        Title:<input value={title} onChange={({ target }) => setTitle(target.value)} type="text" />
      </div>
      <div>
        Author:<input value={author} onChange={({ target }) => setAuthor(target.value)} type="text" />
      </div>
      <div>
        Url:<input value={url} onChange={({ target }) => setUrl(target.value)} type="text" />
      </div>
      <button type="submit">Create</button>
    </form>
  )


  return (
    <div>
      <h2>blogs</h2>
      {notification && <h2 style={{ background: 'aquamarine', border: 'green solid 2px', color: 'green' }}>{notification}</h2>}
      {errorMsg && <h2 style={{ border: 'red solid 2px', color: 'red' }} >{errorMsg}</h2>}
      {!user
        ? loginForm()
        : <div>
          <p>{user.username} Logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <div>
            {blogForm()}
            {
              blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
              )
            }
          </div>
        </div>
      }

    </div>
  )
}

export default App
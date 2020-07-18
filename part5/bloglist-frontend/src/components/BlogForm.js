import React, { useState } from 'react'

const BlogForm = ({ handleBlogCreate }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const Blog = { title, author, url }
        handleBlogCreate(Blog)
        setAuthor('')
        setUrl('')
        setTitle('')

    }
    return (
        < form onSubmit={handleSubmit} >
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
        </form >

    )
}
export default BlogForm

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('blog rendered with only title and author and details are hidden', () => {
  const user = { username : 'test username' }
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 0,
    user: { name: 'test user name' }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog handleBlogUpdate={mockHandler} blog={blog} user={user}/>
  )

  const blogDiv = component.container.querySelector('.blogDiv')
  const blogDetails = component.container.querySelector('.blogDetails')

  expect(blogDiv).toHaveTextContent(blog.title)
  expect(blogDiv).toHaveTextContent(blog.author)
  expect(blogDetails).toHaveStyle('display: none')
})


import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component, mockHandler, blog, user;

  beforeEach(() => {
    user = { username: 'test username' }
    blog = {
      title: 'test title',
      author: 'test author',
      url: 'test url',
      likes: 0,
      user: { name: 'test user name' }
    }

    mockHandler = jest.fn()

    component = render(
      <Blog handleBlogUpdate={mockHandler} blog={blog} user={user} />
    )
  })

  test('blog rendered with only title and author and details are hidden', () => {
    const blogDiv = component.container.querySelector('.blogDiv')
    const blogDetails = component.container.querySelector('.blogDetails')

    expect(blogDiv).toHaveTextContent('test title')
    expect(blogDiv).toHaveTextContent('test author')
    expect(blogDetails).toHaveStyle('display: none')
  })

  test('clicking button shows blog details', () => {
    const button = component.getByText('View Details')
    const blogDetails = component.container.querySelector('.blogDetails')

    fireEvent.click(button) 

    expect(blogDetails).not.toHaveStyle('display: none')
  })

  test('should call handleBlogUpdate twice if like button is clicked twice', () => {
    const likeButton = component.container.querySelector('.likeButton')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
  
  
})


